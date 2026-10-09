import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button, Input, Loading } from '~/components/ui'
import { useCustomerLookup } from '~/hooks/admin/suporte'
import { CustomerLookupResult } from './components/CustomerLookupResult'
import { RecentActivity } from './components/RecentActivity'

export function RastreamentoPage() {
    const [input, setInput] = useState('')
    const [searchedEmail, setSearchedEmail] = useState('')
    const lookup = useCustomerLookup(searchedEmail)

    const search = (email: string) => {
        const normalized = email.trim().toLowerCase()
        if (!normalized) return
        setInput(normalized)
        setSearchedEmail(normalized)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        search(input)
    }

    return (
        <div className="space-y-6 p-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Rastreamento</h1>
                <p className="text-gray-600">
                    Descubra se a compra de um cliente chegou da Hotmart e se o e-mail de acesso foi enviado.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex max-w-xl gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="email"
                        placeholder="E-mail do cliente"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button type="submit" disabled={!input.trim() || lookup.isFetching}>
                    {lookup.isFetching && <Loading className="w-4 h-4 mr-2" />}
                    Rastrear
                </Button>
            </form>

            {searchedEmail && lookup.isError && (
                <p className="text-sm text-red-600">Não foi possível consultar este e-mail. Tente novamente.</p>
            )}
            {searchedEmail && lookup.data && (
                <CustomerLookupResult data={lookup.data} onChanged={() => lookup.refetch()} />
            )}

            <div className="space-y-3 pt-2">
                <h2 className="text-lg font-semibold text-gray-900">Atividade recente</h2>
                <RecentActivity onSelectEmail={search} />
            </div>
        </div>
    )
}
