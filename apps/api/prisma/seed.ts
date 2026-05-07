import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function isoDay(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

async function main() {
  const today = isoDay(new Date());
  const tomorrow = isoDay(new Date(Date.now() + 86_400_000));

  console.log('Seeding database...\n');

  // Clean slate
  await prisma.activity.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.patient.deleteMany();

  // ─── Patients ─────────────────────────────────────────────────
  const patients = await Promise.all([
    prisma.patient.create({ data: { name: 'Elena Vasquez', phone: '+55 11 98765-0001', notes: 'Prefere horários de manhã. Gengivite leve — reforçar uso de fio dental.' } }),
    prisma.patient.create({ data: { name: 'Marcus Chen', phone: '+55 11 98765-0002', notes: 'Histórico de bruxismo; placa noturna em uso.' } }),
    prisma.patient.create({ data: { name: 'Priya Nair', phone: '+55 11 98765-0003', notes: 'Ansiedade com brocas — pausas curtas são apreciadas.' } }),
    prisma.patient.create({ data: { name: 'Noah Williams', phone: '+55 11 98765-0004', notes: 'Prontuário pediátrico. Responsável: Sarah Williams.' } }),
    prisma.patient.create({ data: { name: 'Sofia Andersson', phone: '+55 11 98765-0005', notes: 'Invisalign moldeira 12/20. IPR concluída no arco inferior.' } }),
    prisma.patient.create({ data: { name: 'James Okonkwo', phone: '+55 11 98765-0006', notes: 'Retorno pós-emergência agendado se sensibilidade persistir.' } }),
  ]);

  for (const p of patients) console.log(`  ✓ Patient: ${p.name}`);

  // ─── Appointments ─────────────────────────────────────────────
  const appts = [
    { patientId: patients[0].id, time: '09:00', date: today, status: 'completed' as const, procedure: 'Limpeza e exame' },
    { patientId: patients[1].id, time: '09:45', date: today, status: 'scheduled' as const, procedure: 'Consulta canal' },
    { patientId: patients[2].id, time: '10:30', date: today, status: 'scheduled' as const, procedure: 'Preparo de coroa' },
    { patientId: patients[3].id, time: '11:15', date: today, status: 'pending' as const, procedure: 'Check-up pediátrico' },
    { patientId: patients[4].id, time: '14:00', date: today, status: 'scheduled' as const, procedure: 'Revisão Invisalign' },
    { patientId: patients[5].id, time: '15:30', date: today, status: 'cancelled' as const, procedure: 'Retorno' },
    { patientId: patients[0].id, time: '11:00', date: tomorrow, status: 'scheduled' as const, procedure: 'Raio-X' },
  ];

  for (const a of appts) {
    const created = await prisma.appointment.create({ data: a });
    const patient = patients.find(p => p.id === a.patientId);
    console.log(`  ✓ Appointment: ${patient?.name} — ${a.date} ${a.time}`);
  }

  // ─── Activity ─────────────────────────────────────────────────
  await prisma.activity.create({
    data: {
      type: 'booking',
      message: `Novo agendamento — Marcus Chen · ${tomorrow} 11:00`,
      createdAt: new Date(Date.now() - 30 * 60_000), // 30min ago
    },
  });
  await prisma.activity.create({
    data: {
      type: 'cancellation',
      message: 'Cancelado — James Okonkwo · Retorno',
      createdAt: new Date(Date.now() - 60 * 60_000), // 1h ago
    },
  });
  await prisma.activity.create({
    data: {
      type: 'booking',
      message: 'Novo agendamento — Priya Nair · Preparo de coroa',
      createdAt: new Date(Date.now() - 90 * 60_000), // 1.5h ago
    },
  });

  console.log('  ✓ Activity entries created');
  console.log('\n✅ Seed complete!\n');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
