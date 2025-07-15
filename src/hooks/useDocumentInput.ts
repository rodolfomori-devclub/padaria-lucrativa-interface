import type { ChangeEvent } from 'react'
import { useCallback } from 'react'
import { formatDocument } from '~/utils/formaters'

interface UseDocumentInputProps {
    value: string
    onChange: (value: string) => void
    maxLength?: number
}

interface UseDocumentInputReturn {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    maxLength: number
}

export const useDocumentInput = ({
    value,
    onChange,
    maxLength = 18, // Max CNPJ formatted length
}: UseDocumentInputProps): UseDocumentInputReturn => {
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value
            const formattedValue = formatDocument(inputValue)

            // Only call onChange if the value actually changed
            if (formattedValue !== value) {
                onChange(formattedValue)
            }
        },
        [onChange, value]
    )

    return {
        value: formatDocument(value),
        onChange: handleChange,
        maxLength,
    }
} 