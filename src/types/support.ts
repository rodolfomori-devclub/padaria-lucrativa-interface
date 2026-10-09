import type { PlanType } from "./plan"
import type { UserRole } from "./user"

export type WebhookEventStatus =
    | 'RECEIVED'
    | 'PROCESSED'
    | 'DUPLICATE'
    | 'IGNORED'
    | 'REJECTED'
    | 'INVALID'
    | 'FAILED'

export type EmailLogStatus = 'QUEUED' | 'SENT' | 'FAILED'

export type DiagnosisSeverity = 'ok' | 'warning' | 'error'

export type WebhookEventItem = {
    id: string
    event: string | null
    status: WebhookEventStatus
    reason: string | null
    buyerEmail?: string | null
    externalTransactionId: string | null
    createdAt: string
}

export type EmailLogItem = {
    id: string
    to?: string
    type: string
    subject?: string
    status: EmailLogStatus
    error: string | null
    attempts: number
    messageId?: string | null
    sentAt: string | null
    createdAt: string
}

export type CustomerLookup = {
    email: string
    trackingSince: string | null
    diagnosis: {
        code: string
        severity: DiagnosisSeverity
        message: string
    }
    account: {
        id: string
        name: string
        email: string
        role: UserRole
        isActive: boolean
        createdAt: string
        passwordDefined: boolean
        plan: { type: PlanType; isActive: boolean; expiresAt: string } | null
    } | null
    webhookEvents: WebhookEventItem[]
    transactions: { event: string; externalTransactionId: string; createdAt: string }[]
    emails: EmailLogItem[]
    accessLinks: { createdAt: string; expiresAt: string; used: boolean }[]
}

export type RecentActivity<TItem, TStatus extends string> = {
    data: TItem[]
    summary: {
        days: number
        byStatus: Partial<Record<TStatus, number>>
    }
}
