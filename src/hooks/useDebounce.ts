import { useEffect, useState } from "react"

interface UseDebounceProps {
    value: string
    delay: number
}

export const useDebounce = ({ value, delay = 500 }: UseDebounceProps) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay])

    return debouncedValue
}