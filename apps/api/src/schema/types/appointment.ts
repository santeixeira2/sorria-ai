import { builder } from '../builder.js';

export const AppointmentType = builder.prismaObject('Appointment', {
  fields: (t) => ({
    id: t.exposeID('id'),
    date: t.exposeString('date'),
    time: t.exposeString('time'),
    procedure: t.exposeString('procedure'),
    status: t.expose('status', { type: AppointmentStatusEnum }),
    aiSummary: t.exposeString('aiSummary'),
    source: t.expose('source', { type: AppointmentSourceEnum }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    patient: t.relation('patient'),
    // Convenience field so the client doesn't need to traverse the relation
    patientName: t.string({
      resolve: (appointment, _args, ctx) =>
        ctx.prisma.patient.findUniqueOrThrow({ where: { id: appointment.patientId } }).then((p) => p.name),
    }),
  }),
});

const AppointmentStatusEnum = builder.enumType('AppointmentStatus', {
  values: ['scheduled', 'completed', 'cancelled', 'pending'] as const,
});

const AppointmentSourceEnum = builder.enumType('AppointmentSource', {
  values: ['whatsapp', 'manual'] as const,
});
