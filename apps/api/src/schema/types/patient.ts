import { builder } from '../builder.js';

export const PatientType = builder.prismaObject('Patient', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    phone: t.exposeString('phone'),
    notes: t.exposeString('notes'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    appointments: t.relation('appointments', {
      query: { orderBy: { createdAt: 'desc' } },
    }),
  }),
});
