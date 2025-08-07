import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Loading } from "@/components/ui/loading"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { useCallback, useMemo, useRef, useState } from "react"
import { Label } from "./label"

export type ComboboxOption = {
    id: string
    name: string
}

export type ComboboxProps = {
    // Single selection mode
    value?: string
    onChange?: (value: { id: string, name: string }) => void
    // Multiple selection mode
    values?: string[]
    onMultipleChange?: (values: { id: string, name: string }[]) => void
    multiple?: boolean

    label?: string
    placeholder?: string
    searchPlaceholder?: string
    emptyMessage?: string
    options: ComboboxOption[]
    isLoading?: boolean
    onSearch?: (search: string) => void
    // Optional create functionality
    onCreate?: (name: string) => Promise<ComboboxOption>
    isCreating?: boolean
    createButtonText?: (name: string) => string
    creatingText?: string
    className?: string
    maxSelectedDisplay?: number
}

export function Combobox({
    value,
    onChange,
    values,
    onMultipleChange,
    multiple = false,
    label,
    placeholder = "Selecione uma opção...",
    searchPlaceholder = "Digite para pesquisar...",
    emptyMessage = "Nenhuma opção encontrada",
    options,
    isLoading = false,
    onSearch,
    className,
    maxSelectedDisplay = 3
}: ComboboxProps) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const triggerRef = useRef<HTMLButtonElement>(null)

    // Unified selected values handling
    const selectedValues = useMemo(() => {
        if (multiple) {
            return values || []
        }
        return value ? [value] : []
    }, [multiple, values, value])

    const selectedOptions = useMemo(() => {
        return options.filter(option => selectedValues.includes(option.id))
    }, [options, selectedValues])

    const handleSearch = useCallback((searchValue: string) => {
        setSearch(searchValue)
        onSearch?.(searchValue)
    }, [onSearch])

    const handleSelect = useCallback((option: ComboboxOption) => {
        if (multiple) {
            const currentValues = values || []
            const isSelected = currentValues.includes(option.id)

            let newValues: string[]
            if (isSelected) {
                // Remove from selection
                newValues = currentValues.filter(id => id !== option.id)
            } else {
                // Add to selection
                newValues = [...currentValues, option.id]
            }

            const newSelectedOptions = options.filter(opt => newValues.includes(opt.id))
            onMultipleChange?.(newSelectedOptions)
        } else {
            onChange?.(option)
            setOpen(false)
        }
    }, [multiple, values, options, onMultipleChange, onChange])

    const handleRemoveSelected = useCallback((optionId: string, event: React.MouseEvent) => {
        event.stopPropagation()
        if (multiple && values) {
            const newValues = values.filter(id => id !== optionId)
            const newSelectedOptions = options.filter(opt => newValues.includes(opt.id))
            onMultipleChange?.(newSelectedOptions)
        }
    }, [multiple, values, options, onMultipleChange])

    // Render trigger content based on selection mode
    const renderTriggerContent = () => {
        if (selectedOptions.length === 0) {
            return placeholder
        }

        if (!multiple) {
            return selectedOptions[0]?.name
        }

        // Multiple selection display
        if (selectedOptions.length <= maxSelectedDisplay) {
            return (
                <div className="flex flex-wrap gap-1">
                    {selectedOptions.map((option) => (
                        <Badge
                            key={option.id}
                            variant="secondary"
                            className="text-xs px-2 py-0.5 flex items-center gap-1"
                        >
                            {option.name}
                            <X
                                className="h-3 w-3 cursor-pointer hover:text-destructive"
                                onClick={(e) => handleRemoveSelected(option.id, e)}
                            />
                        </Badge>
                    ))}
                </div>
            )
        }

        return (
            <div className="flex items-center gap-2">
                <span className="text-sm">
                    {selectedOptions.length} selecionado{selectedOptions.length > 1 ? 's' : ''}
                </span>
                <Badge variant="secondary" className="text-xs">
                    {selectedOptions.length}
                </Badge>
            </div>
        )
    }

    return (
        <div className={cn("w-full flex flex-col gap-1", className)}>
            {label && <Label>{label}</Label>}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        ref={triggerRef}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "w-full justify-between bg-white",
                            multiple && selectedOptions.length > 0 && "h-auto min-h-[2.5rem] py-2"
                        )}
                    >
                        <div className="flex-1 text-left overflow-hidden">
                            {renderTriggerContent()}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-full bg-white p-2"
                    align="start"
                    style={{
                        width: triggerRef.current?.offsetWidth,
                    }}
                    shouldRenderPortal={false}
                >
                    <Command shouldFilter={!onSearch}>
                        <CommandInput
                            placeholder={searchPlaceholder}
                            value={search}
                            onValueChange={handleSearch}
                        />

                        <CommandList className="mt-3">
                            <CommandEmpty>
                                <div className="text-center">
                                    {isLoading ? (
                                        <div className="flex items-center justify-center py-6">
                                            <Loading size="md" />
                                        </div>
                                    ) : (
                                        <p className="py-6 text-sm text-muted-foreground">
                                            {emptyMessage}
                                        </p>
                                    )}
                                </div>
                            </CommandEmpty>

                            <CommandGroup>
                                {options.map((option) => {
                                    const isSelected = selectedValues.includes(option.id)
                                    return (
                                        <CommandItem
                                            className="cursor-pointer"
                                            key={option.id}
                                            value={option.name}
                                            onSelect={() => handleSelect(option)}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    isSelected ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {option.name}
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
} 