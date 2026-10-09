import { useQuery } from '@tanstack/react-query'
import { supportService } from '~/services/admin/suporte'
import type { EmailLogStatus, WebhookEventStatus } from '~/types/support'

export const SUPPORT_QUERY_KEY = ['support']

export const useCustomerLookup = (email: string) => {
    return useQuery({
        queryKey: [...SUPPORT_QUERY_KEY, 'lookup', email],
        queryFn: () => supportService.lookup(email),
        enabled: !!email,
    })
}

export const useRecentWebhookEvents = (status?: WebhookEventStatus) => {
    return useQuery({
        queryKey: [...SUPPORT_QUERY_KEY, 'webhook-events', status ?? 'all'],
        queryFn: () => supportService.webhookEvents(status),
    })
}

export const useRecentEmailLogs = (status?: EmailLogStatus) => {
    return useQuery({
        queryKey: [...SUPPORT_QUERY_KEY, 'email-logs', status ?? 'all'],
        queryFn: () => supportService.emailLogs(status),
    })
}
