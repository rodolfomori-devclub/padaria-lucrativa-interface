import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

interface AppLayoutProps {
    children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex h-screen bg-base-light overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                <div className="h-full">{children}</div>
            </main>
        </div>
    )
} 