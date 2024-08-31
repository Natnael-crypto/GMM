"use client"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "./use-toast"
import { ControllerRenderProps } from "react-hook-form"

export interface Option {
    value: string,
    label: string
}

export interface MultiselectProps {
    title: string,
    initOptions: Option[],
    placeholder?: string,
    className?: string,
    max?: number,
    onChange?: (value: string[]) => void,
    selectedOptions?: string[]
}

export default function Multiselect({
    title,
    initOptions,
    placeholder,
    className,
    max,
    selectedOptions,
    onChange
}: MultiselectProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [options, setOptions] = useState<Option[]>(initOptions)

    const map = new Map<string, string>()
    options.forEach((option) => map.set(option.value, option.label))

    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
    const handleOptionSelect = (option: Option) => {
        if (!selectedOptions) {
            if (onChange) {
                onChange([option.value])
            }
        }
        else if (selectedOptions.includes(option.value)) {
            if (onChange) {
                onChange(selectedOptions.filter((v) => v !== option.value))
            }
        } else if (max && selectedOptions.length >= max) {
            toast({ title, description: `You can only select up to ${max} options` })
        } else {
            if (onChange) {
                onChange([...selectedOptions, option.value])
            }
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className={cn(
                            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 [&>span]:text-start", className)}>
                            {selectedOptions && <span>{selectedOptions.length > 0 ? `${selectedOptions.map(value => map.get(value)).join(', ')}` : placeholder}</span>}
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
                            <div className="flex flex-col gap-2">
                                {filteredOptions.map((option) => (
                                    <div key={option.value} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id={option.value}
                                                checked={selectedOptions && selectedOptions.includes(option.value)}
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

