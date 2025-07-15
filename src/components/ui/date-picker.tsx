import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import { cn } from "~/lib/utils"

interface DatePickerProps {
    value?: Date
    onChange?: (date: Date | undefined) => void
    placeholder?: string
    className?: string
}

export function DatePicker({ value, onChange, placeholder = "Selecione uma data", className }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal",
                        !value && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "dd/MM/yyyy", { locale: ptBR }) : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(date) => {
                        onChange?.(date)
                        setIsOpen(false)
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

interface MonthYearPickerProps {
    value?: { month: number; year: number }
    onChange?: (value: { month: number; year: number }) => void
    className?: string
}

export function MonthYearPicker({ value, onChange, className }: MonthYearPickerProps) {
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i)

    const months = [
        { value: 1, label: 'Janeiro' },
        { value: 2, label: 'Fevereiro' },
        { value: 3, label: 'Março' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Maio' },
        { value: 6, label: 'Junho' },
        { value: 7, label: 'Julho' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Setembro' },
        { value: 10, label: 'Outubro' },
        { value: 11, label: 'Novembro' },
        { value: 12, label: 'Dezembro' },
    ]

    return (
        <div className={cn("flex gap-2", className)}>
            <Select
                value={value?.month?.toString()}
                onValueChange={(monthStr) => {
                    const month = parseInt(monthStr)
                    onChange?.({ month, year: value?.year || currentYear })
                }}
            >
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Mês" />
                </SelectTrigger>
                <SelectContent>
                    {months.map((month) => (
                        <SelectItem key={month.value} value={month.value.toString()}>
                            {month.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={value?.year?.toString()}
                onValueChange={(yearStr) => {
                    const year = parseInt(yearStr)
                    onChange?.({ month: value?.month || 1, year })
                }}
            >
                <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                    {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

interface DateRangePickerProps {
    from?: Date
    to?: Date
    onChange?: (from: Date | undefined, to: Date | undefined) => void
    placeholder?: string
    className?: string
}

export function DateRangePicker({ from, to, onChange, placeholder = "Selecione o período", className }: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal",
                        !from && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {from ? (
                        to ? (
                            <>
                                {format(from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                                {format(to, "dd/MM/yyyy", { locale: ptBR })}
                            </>
                        ) : (
                            format(from, "dd/MM/yyyy", { locale: ptBR })
                        )
                    ) : (
                        <span>{placeholder}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="range"
                    defaultMonth={from}
                    selected={{ from, to }}
                    onSelect={(range) => {
                        onChange?.(range?.from, range?.to)
                        if (range?.from && range?.to) {
                            setIsOpen(false)
                        }
                    }}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    )
} 