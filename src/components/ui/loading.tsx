import { cn } from "~/lib/utils"

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export function Loading({ size = 'md', className }: LoadingProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
    }

    return (
        <div
            className={cn(
                'animate-spin rounded-full border-2 border-gray-300 border-t-highlight',
                sizeClasses[size],
                className
            )}
        />
    )
} 