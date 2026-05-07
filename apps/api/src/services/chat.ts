import type { GraphQLContext } from '../context.js';

interface ChatInput {
  phone: string;
  message: string;
  patientName?: string | null;
}

interface ChatResult {
  reply: string;
  action: string | null;
}

/**
 * Handle an incoming chat message from WhatsApp (via n8n).
 * Creates patient if needed, stores conversation, calls LLM.
 */
export async function handleChatMessage(
  input: ChatInput,
  ctx: GraphQLContext,
): Promise<ChatResult> {
  const { phone, message, patientName } = input;
  const { prisma, pubsub } = ctx;

  // 1. Upsert patient by phone
  let patient = await prisma.patient.findUnique({ where: { phone } });
  if (!patient) {
    patient = await prisma.patient.create({
      data: {
        name: patientName || 'Paciente WhatsApp',
        phone,
      },
    });
  } else if (patientName && patient.name === 'Paciente WhatsApp') {
    patient = await prisma.patient.update({
      where: { id: patient.id },
      data: { name: patientName },
    });
  }

  // 2. Log the incoming message as activity
  const activity = await prisma.activity.create({
    data: {
      type: 'message',
      message: `WhatsApp de ${patient.name}: "${message.slice(0, 80)}${message.length > 80 ? '...' : ''}"`,
    },
  });
  pubsub.publish('ACTIVITY_ADDED', activity);

  // 3. LLM integration placeholder
  // TODO: Integrate with OpenAI when OPENAI_API_KEY is configured
  const hasApiKey = !!process.env.OPENAI_API_KEY;

  if (!hasApiKey) {
    return {
      reply: `Olá ${patient.name}! Sou a assistente da Sorria. No momento estou em modo de desenvolvimento. Recebi sua mensagem: "${message.slice(0, 50)}..."`,
      action: null,
    };
  }

  // When OpenAI is configured, this would call the LLM service
  // and potentially create appointments automatically
  return {
    reply: 'Olá! Sou a assistente da Sorria. Como posso ajudar?',
    action: null,
  };
}
