import { format } from 'date-fns'

export const formatCurrency = (value?: number | string) => {
    if (value === undefined || value === null) return ''
    if (value === 0) return '0,00'
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    }).format(Number(value) / 100)
}

export const formatNumber = (value?: number | string) => {
    if (!value) return '0,00'
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
    }).format(Number(value))
}

export const formatMonthYear = (date: Date) => {
    return format(date, 'MM/yyyy')
}

export const formatDateDDMMYYYY = (date?: string) => {
    if (!date) return '-'
    return date.split('T')[0].split('-').reverse().join('/')
}

export const formatDateForInput = (date?: string) => {
    if (!date) return '';
    // Get local date parts
    const [year, month, day] = date.split('T')[0].split('-')
    const formattedDate = `${year}-${month}-${day}`
    return formattedDate
}

export const removeNonNumeric = (value: string): string => {
    if (!value) return ''
    return value.replace(/\D/g, '')
}

export const isCPF = (numbers: string): boolean => {
    return numbers.length <= 11
}

export const formatCPF = (numbers: string): string => {
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return numbers.replace(/(\d{3})(\d+)/, '$1.$2')
    if (numbers.length <= 9) return numbers.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3')
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4')
}

export const formatCNPJ = (numbers: string): string => {
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 5) return numbers.replace(/(\d{2})(\d+)/, '$1.$2')
    if (numbers.length <= 8) return numbers.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3')
    if (numbers.length <= 12) return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4')
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, '$1.$2.$3/$4-$5')
}

export const formatDocument = (document: string): string => {
    if (!document) return ''

    const numbers = removeNonNumeric(document)

    // Limit to maximum CNPJ length (14 digits)
    const limitedNumbers = numbers.slice(0, 14)

    if (isCPF(limitedNumbers)) {
        return formatCPF(limitedNumbers)
    } else {
        return formatCNPJ(limitedNumbers)
    }
}

export const getUnformattedDocument = (document: string): string => {
    return removeNonNumeric(document)
}

export const isValidDocumentLength = (document: string): boolean => {
    const numbers = removeNonNumeric(document)
    return numbers.length === 11 || numbers.length === 14
}


export const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}