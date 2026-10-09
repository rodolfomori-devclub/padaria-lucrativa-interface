import { api } from "~/lib/axios"
import type {
    CustomerLookup,
    EmailLogItem,
    EmailLogStatus,
    RecentActivity,
    WebhookEventItem,
    WebhookEventStatus,
} from "~/types/support"

const lookup = async (email: string): Promise<CustomerLookup> => {
    const { data } = await api.get('/support/lookup', { params: { email } })
    return data
}

const webhookEvents = async (
    status?: WebhookEventStatus,
): Promise<RecentActivity<WebhookEventItem, WebhookEventStatus>> => {
    const { data } = await api.get('/support/webhook-events', { params: { status, limit: 50 } })
    return data
}

const emailLogs = async (
    status?: EmailLogStatus,
): Promise<RecentActivity<EmailLogItem, EmailLogStatus>> => {
    const { data } = await api.get('/support/email-logs', { params: { status, limit: 50 } })
    return data
}

export const supportService = {
    lookup,
    webhookEvents,
    emailLogs,
}
