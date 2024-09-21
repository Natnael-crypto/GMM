"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./table-view-options"

import { DataTableFacetedFilter } from "./table-faceted-filter"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { UserField, UserQueryParams } from "@/lib/user/types"
import { userToolbarOptions } from "./user-toolbar-options"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    const searchParams = useSearchParams()
    const initialSearchValue = UserQueryParams.fromQueryString(searchParams.toString())

    const [filterKey, setFilterKey] = useState<UserField>('firstName')
    const [searchValue, setSearchValue] = useState<string>('')

    useEffect(() => {
        let initFilterField = undefined
        let initFilterValue = undefined

        if (initialSearchValue.filters) {
            for (const field of initialSearchValue.filterableFields) {
                if (initialSearchValue.filters[field] && initialSearchValue.filters[field].like) {
                    initFilterField = field
                    initFilterValue = initialSearchValue.filters[field].like.value ?? ''
                }
            }
        }

        setFilterKey(initFilterField ?? 'firstName')
        setSearchValue(initFilterValue ?? '')
    }, [])

    useEffect(() => {
        const queryParams = new UserQueryParams(initialSearchValue)

        queryParams.filters[filterKey] = searchValue === '' ? undefined : {
            like: {
                value: searchValue,
            }
        }

        window.history.replaceState(null, '', `?${queryParams.toQueryString()}`)
    }, [searchValue, filterKey])


    const handleUpdateSearchFilterKey = (value?: string) => {
        const queryParams = new UserQueryParams(initialSearchValue)

        // clear all previous `like` filters
        for (const field of queryParams.filterableFields) {
            if (queryParams.filters[field]) {
                queryParams.filters[field].like = undefined
            }
        }

        window.history.replaceState(null, '', `?${queryParams.toQueryString()}`)
        setFilterKey(value as UserField ?? 'firstName')
    }

    return (
        <div className="flex justify-between">
            <div className="flex flex-col sm:flex-row flex-grow gap-x-2 gap-y-2">
                <Input
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="h-8 w-full sm:w-[250px] shadow border border-gray-200 placeholder:text-xs"
                />
                <div className="flex flex-wrap flex-grow flex-1 items-center gap-x-2 gap-y-2">
                    {table.getColumn("firstName") && (
                        <DataTableFacetedFilter
                            selected={filterKey}
                            onUpdate={handleUpdateSearchFilterKey}
                            title="Search by"
                            options={userToolbarOptions}
                        />
                    )}
                    {isFiltered && (
                        <Button
                            onClick={() => table.resetColumnFilters()}
                            variant="outline" size="sm"
                            className="h-8 border border-gray-300 font-normal shadow text-xs bg-red-200 text-red-900 hover:bg-red-300"
                        >
                            <Cross2Icon className="mr-2 h-4 w-4" />
                            Reset Filters
                        </Button>
                    )}
                </div>
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )
}