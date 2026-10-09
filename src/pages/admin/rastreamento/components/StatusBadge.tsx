import { cn } from '~/lib/utils'
import type { EmailLogStatus, WebhookEventStatus } from '~/types/support'
import { EMAIL_STATUS, TONES, WEBHOOK_STATUS, type Tone } from './statusLabels'

export function StatusBadge({ label, tone, title }: { label: string; tone: Tone; title?: string }) {
    return (
        <span
            title={title}
            className={cn(
                'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap',
                TONES[tone],
            )}
        >
            {label}
        </span>
    )
}

export function WebhookStatusBadge({ status }: { status: WebhookEventStatus }) {
    const s = WEBHOOK_STATUS[status]
    return <StatusBadge label={s.label} tone={s.tone} title={s.hint} />
}

export function EmailStatusBadge({ status }: { status: EmailLogStatus }) {
    const s = EMAIL_STATUS[status]
    return <StatusBadge label={s.label} tone={s.tone} />
}
