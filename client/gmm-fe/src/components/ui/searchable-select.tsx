"use client"

import { useState, useMemo } from "react"
import { useDebounce } from 'use-debounce'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Check, ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Option {
    value: string,
    label: string
}

export interface AutoCompleteProps {
    options: Option[],
    placeholder?: string,
    className?: string,
    onChange?: (value: string) => void,
    selectedOption?: string,
    extend?: boolean
}

export default function AutoComplete({
    options,
    placeholder,
    className,
    selectedOption,
    onChange,
    extend
}: AutoCompleteProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300)
    const [isOpen, setIsOpen] = useState(false)

    let _options = options
    if (extend && searchTerm.length > 0) {
        _options = [...options, { value: searchTerm, label: searchTerm }]
    }

    const map = useMemo(() => {
        const map = new Map<string, string>()
        _options.forEach((option) => map.set(option.value, option.label))
        if (selectedOption && !map.get(selectedOption)) {
            map.set(selectedOption, selectedOption)
            _options.push({
                value: selectedOption,
                label: selectedOption
            })
        }
        return map
    }, [options, selectedOption, extend, searchTerm])

    const filteredOptions = useMemo(() => {
        return _options.filter((option) => option.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    }, [debouncedSearchTerm, _options])

    const handleOptionSelect = (option: Option) => {
        if (onChange) {
            onChange(option.value)
        }
        setIsOpen(false)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger asChild>
                        <button className={cn(
                            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 [&>span]:text-start", className)}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span>{selectedOption ? map.get(selectedOption) : placeholder}</span>
                            <ChevronDownIcon className="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <div className="flex flex-col gap-4">
                            <Input
                                type="search"
                                placeholder="Search options..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full"
                            />
                            <div className="flex flex-col max-h-56 overflow-auto">
                                {filteredOptions.map((option) => (
                                    <div key={option.value} className="flex items-center justify-between cursor-pointer" onClick={() => handleOptionSelect(option)}>
                                        <div className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground w-full p-1 rounded-sm">
                                            <Check className={cn("h-4 w-4", option.value === selectedOption ? 'opacity-100' : 'opacity-0')} />
                                            <span className="text-sm">{option.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
