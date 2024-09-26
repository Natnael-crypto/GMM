"use client"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDownIcon } from "lucide-react"
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
    selectedOption?: string
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

    let _options = options
    if (extend && searchTerm.length > 0) {
        _options = [...options, { value: searchTerm, label: searchTerm }]
    }

    const map = new Map<string, string>()
    _options.forEach((option) => map.set(option.value, option.label))

    if (selectedOption && !map.get(selectedOption)) {
        map.set(selectedOption, selectedOption)
        _options.push({
            value: selectedOption,
            label: selectedOption
        })
    }

    let filteredOptions = _options?.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase())) ?? []

    const handleOptionSelect = (option: Option) => {
        if (onChange) {
            onChange(option.value)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className={cn(
                            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 [&>span]:text-start", className)}>
                            <span>{selectedOption ? map.get(selectedOption) : placeholder}</span>
                            <ChevronDownIcon className="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-4">
                        <div className="flex flex-col gap-4">
                            <Input
                                type="search"
                                placeholder="Search options..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full"
                            />
                            <div className="flex flex-col gap-2 max-h-56 overflow-auto no-scrollbar">
                                {filteredOptions.map((option) => (
                                    <div key={option.value} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id={option.value}
                                                checked={option.value === selectedOption}
                                                onCheckedChange={() => handleOptionSelect(option)}
                                            />
                                            <Label htmlFor={option.value} className="font-normal">
                                                {option.label}
                                            </Label>
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

