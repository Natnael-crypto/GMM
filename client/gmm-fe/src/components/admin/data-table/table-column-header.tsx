'use client'

import {
    CaretSortIcon,
    EyeNoneIcon,
} from "@radix-ui/react-icons"
import { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSearchParams } from "next/navigation"
import { FilterRule, UserField, UserQueryParams } from "@/lib/user/types"
import React from "react"
import FilterOptionItem from "./filter-option"

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
    options?: FilterRule[]
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
    options
}: DataTableColumnHeaderProps<TData, TValue>) {
    const searchParams = useSearchParams()
    const initQueryParams = UserQueryParams.fromQueryString(searchParams.toString())

    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }

    const handleSort = (direction: 'asc' | 'desc' | null) => {
        const queryParams = new UserQueryParams(initQueryParams)

        if (direction) {
            queryParams.sort = {
                field: column.id as UserField,
                direction,
            }
        } else {
            queryParams.sort = undefined
        }

        window.history.replaceState(null, '', `?${queryParams.toQueryString()}`)
    }

    return (
        <div className={cn("flex items-center", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`-ml-3 h-8 data-[state=open]:bg-accent data-[state=open]:text-background ${initQueryParams.sort?.field === column.id ? 'text-gray-900 font-bold' : ''}`}
                    >
                        <span className="text-xs">{title}</span>
                        {column.getIsSorted() === "desc" ? (
                            <ChevronDown className="ml-2 h-4 w-4" />
                        ) : column.getIsSorted() === "asc" ? (
                            <ChevronUp className="ml-2 h-4 w-4" />
                        ) : (
                            <CaretSortIcon className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="max-h-36 overflow-auto">
                    <DropdownMenuItem onClick={() => handleSort('asc')} className={cn("text-xs", initQueryParams.sort?.field === column.id && initQueryParams.sort?.direction === 'asc' ? 'font-bold' : '')}>
                        <ChevronUp className="text-xs mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort('desc')} className={cn("text-xs", initQueryParams.sort?.field === column.id && initQueryParams.sort?.direction === 'desc' ? 'font-bold' : '')}>
                        <ChevronDown className="text-xs mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Desc
                    </DropdownMenuItem>
                    {
                        options &&
                        <>
                            <DropdownMenuSeparator />
                            {options.map(
                                (option, index) => (
                                    <DropdownMenuItem key={index} className="text-xs" onClick={(e) => e.preventDefault()}>
                                        <FilterOptionItem option={option} column={column} />
                                    </DropdownMenuItem>)
                            )
                            }
                        </>
                    }

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)} className="text-xs">
                        <EyeNoneIcon className="text-xs mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Hide
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    )
}