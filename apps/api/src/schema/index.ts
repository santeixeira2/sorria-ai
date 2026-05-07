import { builder } from './builder.js';

// Import types so they register with the builder
import './types/patient.js';
import './types/appointment.js';
import './types/activity.js';

// Add a DateTime scalar
builder.scalarType('DateTime', {
  serialize: (value) => (value instanceof Date ? value.toISOString() : String(value)),
  parseValue: (value) => new Date(String(value)),
});

// ─── Queries ────────────────────────────────────────────────────────

builder.queryField('appointments', (t) =>
  t.prismaField({
    type: ['Appointment'],
    args: {
      date: t.arg.string({ required: false }),
      status: t.arg({ type: 'AppointmentStatus', required: false }),
    },
    resolve: (query, _root, args, ctx) => {
      const where: Record<string, unknown> = {};
      if (args.date) where.date = args.date;
      if (args.status) where.status = args.status;
      return ctx.prisma.appointment.findMany({
        ...query,
        where,
        orderBy: [{ date: 'asc' }, { time: 'asc' }],
      });
    },
  })
);

builder.queryField('appointment', (t) =>
  t.prismaField({
    type: 'Appointment',
    nullable: true,
    args: { id: t.arg.id({ required: true }) },
    resolve: (query, _root, args, ctx) =>
      ctx.prisma.appointment.findUnique({ ...query, where: { id: String(args.id) } }),
  })
);

builder.queryField('patients', (t) =>
  t.prismaField({
    type: ['Patient'],
    resolve: (query, _root, _args, ctx) =>
      ctx.prisma.patient.findMany({ ...query, orderBy: { name: 'asc' } }),
  })
);

builder.queryField('patient', (t) =>
  t.prismaField({
    type: 'Patient',
    nullable: true,
    args: { id: t.arg.id({ required: true }) },
    resolve: (query, _root, args, ctx) =>
      ctx.prisma.patient.findUnique({ ...query, where: { id: String(args.id) } }),
  })
);

builder.queryField('activity', (t) =>
  t.prismaField({
    type: ['Activity'],
    args: { limit: t.arg.int({ required: false, defaultValue: 50 }) },
    resolve: (query, _root, args, ctx) =>
      ctx.prisma.activity.findMany({
        ...query,
        take: Math.min(args.limit ?? 50, 200),
        orderBy: { createdAt: 'desc' },
      }),
  })
);

// ─── Mutations ──────────────────────────────────────────────────────

const CreateAppointmentInput = builder.inputType('CreateAppointmentInput', {
  fields: (t) => ({
    patientId: t.id({ required: true }),
    date: t.string({ required: true }),
    time: t.string({ required: true }),
    procedure: t.string({ required: false }),
    status: t.field({ type: 'AppointmentStatus', required: false }),
    aiSummary: t.string({ required: false }),
    source: t.field({ type: 'AppointmentSource', required: false }),
  }),
});

builder.mutationField('createAppointment', (t) =>
  t.prismaField({
    type: 'Appointment',
    args: { input: t.arg({ type: CreateAppointmentInput, required: true }) },
    resolve: async (query, _root, { input }, ctx) => {
      const patient = await ctx.prisma.patient.findUniqueOrThrow({
        where: { id: String(input.patientId) },
      });

      const appointment = await ctx.prisma.appointment.create({
        ...query,
        data: {
          patientId: patient.id,
          date: input.date,
          time: input.time,
          procedure: input.procedure ?? '',
          status: input.status ?? 'scheduled',
          aiSummary: input.aiSummary ?? '',
          source: input.source ?? 'manual',
        },
      });

      // Log activity
      await ctx.prisma.activity.create({
        data: {
          type: 'booking',
          message: `Novo agendamento — ${patient.name} · ${input.date} ${input.time}${input.procedure ? ' · ' + input.procedure : ''}`,
        },
      });

      // Publish for subscriptions
      ctx.pubsub.publish('APPOINTMENT_CREATED', appointment);
      
      return appointment;
    },
  })
);

const UpdateAppointmentInput = builder.inputType('UpdateAppointmentInput', {
  fields: (t) => ({
    date: t.string({ required: false }),
    time: t.string({ required: false }),
    procedure: t.string({ required: false }),
    status: t.field({ type: 'AppointmentStatus', required: false }),
    aiSummary: t.string({ required: false }),
  }),
});

builder.mutationField('updateAppointment', (t) =>
  t.prismaField({
    type: 'Appointment',
    args: {
      id: t.arg.id({ required: true }),
      input: t.arg({ type: UpdateAppointmentInput, required: true }),
    },
    resolve: async (query, _root, { id, input }, ctx) => {
      const data: Record<string, unknown> = {};
      if (input.date != null) data.date = input.date;
      if (input.time != null) data.time = input.time;
      if (input.procedure != null) data.procedure = input.procedure;
      if (input.status != null) data.status = input.status;
      if (input.aiSummary != null) data.aiSummary = input.aiSummary;

      const updated = await ctx.prisma.appointment.update({
        ...query,
        where: { id: String(id) },
        data,
      });

      if (input.status === 'cancelled') {
        const patient = await ctx.prisma.patient.findUnique({ where: { id: updated.patientId } });
        await ctx.prisma.activity.create({
          data: {
            type: 'cancellation',
            message: `Cancelado — ${patient?.name ?? 'Paciente'} · ${updated.procedure || 'consulta'}`,
          },
        });
      }

      return updated;
    },
  })
);

builder.mutationField('cancelAppointment', (t) =>
  t.prismaField({
    type: 'Appointment',
    args: { id: t.arg.id({ required: true }) },
    resolve: async (query, _root, { id }, ctx) => {
      const appointment = await ctx.prisma.appointment.update({
        ...query,
        where: { id: String(id) },
        data: { status: 'cancelled' },
      });

      const patient = await ctx.prisma.patient.findUnique({ where: { id: appointment.patientId } });
      await ctx.prisma.activity.create({
        data: {
          type: 'cancellation',
          message: `Cancelado — ${patient?.name ?? 'Paciente'} · ${appointment.procedure || 'consulta'}`,
        },
      });

      return appointment;
    },
  })
);

// ─── Chat Mutation (for n8n/WhatsApp) ───────────────────────────────

const ChatInput = builder.inputType('ChatInput', {
  fields: (t) => ({
    phone: t.string({ required: true }),
    message: t.string({ required: true }),
    patientName: t.string({ required: false }),
  }),
});

const ChatResponse = builder.objectType('ChatResponse', {
  fields: (t) => ({
    reply: t.exposeString('reply'),
    action: t.exposeString('action', { nullable: true }),
  }),
});

builder.mutationField('chat', (t) =>
  t.field({
    type: ChatResponse,
    args: { input: t.arg({ type: ChatInput, required: true }) },
    resolve: async (_root, { input }, ctx) => {
      // Import dynamically to avoid circular deps
      const { handleChatMessage } = await import('../services/chat.js');
      return handleChatMessage(input, ctx);
    },
  })
);

// ─── Subscriptions ──────────────────────────────────────────────────

builder.subscriptionField('appointmentCreated', (t) =>
  t.prismaField({
    type: 'Appointment',
    subscribe: (_root, _args, ctx) =>
      ctx.pubsub.asyncIterableIterator(['APPOINTMENT_CREATED']),
    resolve: (query, payload) => payload,
  })
);

builder.subscriptionField('activityAdded', (t) =>
  t.prismaField({
    type: 'Activity',
    subscribe: (_root, _args, ctx) =>
      ctx.pubsub.asyncIterableIterator(['ACTIVITY_ADDED']),
    resolve: (query, payload) => payload,
  })
);

// ─── Build and export the schema ────────────────────────────────────

export const schema = builder.toSchema();
