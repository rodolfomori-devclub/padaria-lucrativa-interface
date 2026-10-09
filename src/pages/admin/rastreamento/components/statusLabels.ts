import type { EmailLogStatus, WebhookEventStatus } from '~/types/support'

export const TONES = {
    green: 'bg-green-100 text-green-800 border-green-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
} as const

export type Tone = keyof typeof TONES

export const WEBHOOK_STATUS: Record<WebhookEventStatus, { label: string; tone: Tone; hint: string }> = {
    RECEIVED: { label: 'Recebido', tone: 'blue', hint: 'Chegou e aguarda processamento' },
    PROCESSED: { label: 'Processado', tone: 'green', hint: 'Conta/plano atualizados' },
    DUPLICATE: { label: 'Duplicado', tone: 'gray', hint: 'A Hotmart reenviou uma transação já processada' },
    IGNORED: { label: 'Ignorado', tone: 'gray', hint: 'Evento que a API não trata (ex.: boleto impresso)' },
    REJECTED: { label: 'Recusado', tone: 'red', hint: 'Barrado na entrada (hottok/configuração)' },
    INVALID: { label: 'Inválido', tone: 'red', hint: 'Formato que a API não entende' },
    FAILED: { label: 'Falhou', tone: 'red', hint: 'Erro ao processar' },
}

export const EMAIL_STATUS: Record<EmailLogStatus, { label: string; tone: Tone }> = {
    QUEUED: { label: 'Na fila', tone: 'amber' },
    SENT: { label: 'Enviado', tone: 'green' },
    FAILED: { label: 'Falhou', tone: 'red' },
}

const WEBHOOK_EVENT_LABEL: Record<string, string> = {
    PURCHASE_APPROVED: 'Compra aprovada',
    PURCHASE_REFUNDED: 'Reembolso',
    PURCHASE_DELAYED: 'Pagamento atrasado',
    PURCHASE_PROTEST: 'Chargeback',
    PURCHASE_EXPIRED: 'Compra expirada',
    PURCHASE_BILLET_PRINTED: 'Boleto impresso',
    SUBSCRIPTION_CANCELLATION: 'Assinatura cancelada',
    CLUB_FIRST_ACCESS: 'Primeiro acesso',
}

/** Mostra o nome do evento em português, mantendo o original se for desconhecido. */
export const eventLabel = (event?: string | null) =>
    event ? WEBHOOK_EVENT_LABEL[event] ?? event : '-'

export const EMAIL_TYPE_LABEL: Record<string, string> = {
    welcome: 'Boas-vindas (compra ou primeiro acesso)',
    'client-invitation': 'Convite / reenvio de acesso',
    'plan-blocked': 'Plano suspenso',
    'password-reset': 'Esqueci minha senha',
}
