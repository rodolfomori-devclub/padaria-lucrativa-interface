import { AlertTriangle, CheckCircle2, UserPlus, XCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '~/components/ui/table'
import { cn } from '~/lib/utils'
import { ResendAccessDialog } from '~/pages/admin/clientes/components'
import { ROUTES } from '~/routes/routes'
import type { CustomerLookup, DiagnosisSeverity } from '~/types/support'
import { formatDateDDMMYYYY, formatDateTimeBR } from '~/utils/formaters'
import { plansTypes } from '~/utils/plans'
import { EmailStatusBadge, StatusBadge, WebhookStatusBadge } from './StatusBadge'
import { EMAIL_TYPE_LABEL, eventLabel } from './statusLabels'

const SEVERITY_STYLE: Record<DiagnosisSeverity, { box: string; Icon: typeof CheckCircle2 }> = {
    ok: { box: 'bg-green-50 border-green-200 text-green-900', Icon: CheckCircle2 },
    warning: { box: 'bg-amber-50 border-amber-200 text-amber-900', Icon: AlertTriangle },
    error: { box: 'bg-red-50 border-red-200 text-red-900', Icon: XCircle },
}

function Section({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
    return (
        <section className={cn('bg-white rounded-lg shadow-sm border border-gray-200 p-5 space-y-3', className)}>
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            {children}
        </section>
    )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="flex justify-between gap-4 py-1 text-sm border-b border-gray-100 last:border-0">
            <span className="text-gray-500">{label}</span>
            <span className="text-gray-900 text-right">{children}</span>
        </div>
    )
}

interface CustomerLookupResultProps {
    data: CustomerLookup
    onChanged: () => void
}

export function CustomerLookupResult({ data, onChanged }: CustomerLookupResultProps) {
    const { diagnosis, account } = data
    const { box, Icon } = SEVERITY_STYLE[diagnosis.severity]
    const now = new Date()
    const planLabel = (type?: string) => plansTypes.find((p) => p.value === type)?.label ?? type ?? '-'

    return (
        <div className="space-y-4">
            <div className={cn('flex gap-3 rounded-lg border p-4', box)}>
                <Icon className="size-5 shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <p className="font-medium">Diagnóstico para {data.email}</p>
                    <p className="text-sm">{diagnosis.message}</p>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <Section title="Conta">
                    {account ? (
                        <>
                            <div>
                                <Field label="Nome">{account.name}</Field>
                                <Field label="E-mail">{account.email}</Field>
                                <Field label="Criada em">{formatDateTimeBR(account.createdAt)}</Field>
                                <Field label="Plano">
                                    {account.plan
                                        ? `${planLabel(account.plan.type)} · até ${formatDateDDMMYYYY(account.plan.expiresAt)}${account.plan.isActive ? '' : ' (suspenso)'}`
                                        : 'Sem plano'}
                                </Field>
                                <Field label="Senha definida">
                                    {account.passwordDefined ? 'Sim' : 'Ainda não'}
                                </Field>
                                <Field label="Situação">{account.isActive ? 'Ativa' : 'Desativada'}</Field>
                            </div>
                            <ResendAccessDialog
                                client={{ id: account.id, email: account.email }}
                                onResent={onChanged}
                                showLabel
                            />
                        </>
                    ) : (
                        <div className="space-y-3 text-sm text-gray-600">
                            <p>Não existe conta com este e-mail.</p>
                            <Link
                                to={ROUTES.ADMIN_CLIENTES}
                                className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
                            >
                                <UserPlus className="size-4" />
                                Cadastrar em Clientes
                            </Link>
                        </div>
                    )}
                </Section>

                <Section title="Links de acesso gerados">
                    {data.accessLinks.length === 0 ? (
                        <p className="text-sm text-gray-600">Nenhum link de definição de senha foi gerado.</p>
                    ) : (
                        <ul className="space-y-1">
                            {data.accessLinks.map((link) => {
                                const expired = new Date(link.expiresAt) <= now
                                return (
                                    <li key={link.createdAt} className="flex items-center justify-between text-sm py-1 border-b border-gray-100 last:border-0">
                                        <span className="text-gray-700">
                                            Gerado {formatDateTimeBR(link.createdAt)} · vale até {formatDateTimeBR(link.expiresAt)}
                                        </span>
                                        {link.used ? (
                                            <StatusBadge label="Usado" tone="green" />
                                        ) : expired ? (
                                            <StatusBadge label="Expirado" tone="gray" />
                                        ) : (
                                            <StatusBadge label="Válido" tone="blue" />
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </Section>
            </div>

            <Section title="Compras recebidas da Hotmart">
                {data.webhookEvents.length === 0 ? (
                    <p className="text-sm text-gray-600">
                        Nenhum webhook com este e-mail de comprador.
                        {data.trackingSince && ` O registro de webhooks começou em ${formatDateTimeBR(data.trackingSince)}.`}
                    </p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Recebido em</TableHead>
                                <TableHead>Evento</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Detalhe</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.webhookEvents.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell className="whitespace-nowrap">{formatDateTimeBR(event.createdAt)}</TableCell>
                                    <TableCell>{eventLabel(event.event)}</TableCell>
                                    <TableCell><WebhookStatusBadge status={event.status} /></TableCell>
                                    <TableCell className="text-sm text-gray-600 whitespace-normal">{event.reason ?? '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                {data.transactions.length > 0 && (
                    <p className="text-xs text-gray-500">
                        Transações processadas: {data.transactions.map((t) => `${eventLabel(t.event)} em ${formatDateTimeBR(t.createdAt)}`).join(' · ')}
                    </p>
                )}
            </Section>

            <Section title="E-mails">
                {data.emails.length === 0 ? (
                    <p className="text-sm text-gray-600">Nenhum e-mail registrado para este endereço.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Criado em</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Detalhe</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.emails.map((email) => (
                                <TableRow key={email.id}>
                                    <TableCell className="whitespace-nowrap">{formatDateTimeBR(email.createdAt)}</TableCell>
                                    <TableCell>{EMAIL_TYPE_LABEL[email.type] ?? email.type}</TableCell>
                                    <TableCell><EmailStatusBadge status={email.status} /></TableCell>
                                    <TableCell className="text-sm text-gray-600 whitespace-normal">
                                        {email.status === 'SENT'
                                            ? `Aceito pela AWS em ${formatDateTimeBR(email.sentAt)}`
                                            : email.error
                                                ? `${email.error} (${email.attempts} tentativa${email.attempts === 1 ? '' : 's'})`
                                                : 'Aguardando envio'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Section>
        </div>
    )
}
