import { useState } from 'react'
import { TableSkeleton } from '~/components/Table/Skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '~/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { useRecentEmailLogs, useRecentWebhookEvents } from '~/hooks/admin/suporte'
import { cn } from '~/lib/utils'
import type { EmailLogStatus, WebhookEventStatus } from '~/types/support'
import { formatDateTimeBR } from '~/utils/formaters'
import { EmailStatusBadge, WebhookStatusBadge } from './StatusBadge'
import { EMAIL_STATUS, EMAIL_TYPE_LABEL, WEBHOOK_STATUS, eventLabel } from './statusLabels'

function StatusFilter<T extends string>({
    labels,
    counts,
    days,
    value,
    onChange,
}: {
    labels: Record<T, { label: string }>
    counts: Partial<Record<T, number>> | undefined
    days: number | undefined
    value: T | undefined
    onChange: (value: T | undefined) => void
}) {
    const chip = (active: boolean) =>
        cn(
            'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
            active ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
        )

    return (
        <div className="flex flex-wrap items-center gap-2">
            <button type="button" className={chip(!value)} onClick={() => onChange(undefined)}>
                Todos
            </button>
            {(Object.keys(labels) as T[]).map((status) => (
                <button
                    key={status}
                    type="button"
                    className={chip(value === status)}
                    onClick={() => onChange(value === status ? undefined : status)}
                >
                    {labels[status].label} · {counts?.[status] ?? 0}
                </button>
            ))}
            {days && <span className="text-xs text-gray-500">contagem dos últimos {days} dias</span>}
        </div>
    )
}

function EmailButton({ email, onSelect }: { email?: string | null; onSelect: (email: string) => void }) {
    if (!email) return <span className="text-gray-400">-</span>
    return (
        <button
            type="button"
            className="text-left text-blue-700 hover:underline"
            title="Rastrear este e-mail"
            onClick={() => onSelect(email)}
        >
            {email}
        </button>
    )
}

export function RecentActivity({ onSelectEmail }: { onSelectEmail: (email: string) => void }) {
    const [webhookStatus, setWebhookStatus] = useState<WebhookEventStatus>()
    const [emailStatus, setEmailStatus] = useState<EmailLogStatus>()
    const webhooks = useRecentWebhookEvents(webhookStatus)
    const emails = useRecentEmailLogs(emailStatus)

    return (
        <Tabs defaultValue="webhooks" className="space-y-4">
            <TabsList>
                <TabsTrigger value="webhooks">Webhooks recebidos</TabsTrigger>
                <TabsTrigger value="emails">E-mails enviados</TabsTrigger>
            </TabsList>

            <TabsContent value="webhooks" className="space-y-3">
                <StatusFilter
                    labels={WEBHOOK_STATUS}
                    counts={webhooks.data?.summary.byStatus}
                    days={webhooks.data?.summary.days}
                    value={webhookStatus}
                    onChange={setWebhookStatus}
                />
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {webhooks.isLoading ? (
                        <TableSkeleton />
                    ) : webhooks.data?.data.length ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Recebido em</TableHead>
                                    <TableHead>Comprador</TableHead>
                                    <TableHead>Evento</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Detalhe</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {webhooks.data.data.map((event) => (
                                    <TableRow key={event.id}>
                                        <TableCell className="whitespace-nowrap">{formatDateTimeBR(event.createdAt)}</TableCell>
                                        <TableCell><EmailButton email={event.buyerEmail} onSelect={onSelectEmail} /></TableCell>
                                        <TableCell>{eventLabel(event.event)}</TableCell>
                                        <TableCell><WebhookStatusBadge status={event.status} /></TableCell>
                                        <TableCell className="text-sm text-gray-600 whitespace-normal">{event.reason ?? '-'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="p-6 text-sm text-gray-600">Nenhum webhook registrado ainda.</p>
                    )}
                </div>
            </TabsContent>

            <TabsContent value="emails" className="space-y-3">
                <StatusFilter
                    labels={EMAIL_STATUS}
                    counts={emails.data?.summary.byStatus}
                    days={emails.data?.summary.days}
                    value={emailStatus}
                    onChange={setEmailStatus}
                />
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {emails.isLoading ? (
                        <TableSkeleton />
                    ) : emails.data?.data.length ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Criado em</TableHead>
                                    <TableHead>Destinatário</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Detalhe</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {emails.data.data.map((email) => (
                                    <TableRow key={email.id}>
                                        <TableCell className="whitespace-nowrap">{formatDateTimeBR(email.createdAt)}</TableCell>
                                        <TableCell><EmailButton email={email.to} onSelect={onSelectEmail} /></TableCell>
                                        <TableCell>{EMAIL_TYPE_LABEL[email.type] ?? email.type}</TableCell>
                                        <TableCell><EmailStatusBadge status={email.status} /></TableCell>
                                        <TableCell className="text-sm text-gray-600 whitespace-normal">
                                            {email.status === 'SENT'
                                                ? `Aceito pela AWS em ${formatDateTimeBR(email.sentAt)}`
                                                : email.error ?? 'Aguardando envio'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="p-6 text-sm text-gray-600">Nenhum e-mail registrado ainda.</p>
                    )}
                </div>
            </TabsContent>
        </Tabs>
    )
}
