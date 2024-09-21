"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./table-view-options"

import { DataTableFacetedFilter } from "./table-faceted-filter"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { QueryParams, UserQueryParams } from "@/lib/user/types"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    const searchParams = useSearchParams()
    const initialSearchValue = QueryParams.fromQueryString(searchParams.toString())
    const [searchValue, setSearchValue] = useState<string>('')

    // console.log(initialSearchValue)

    console.log(UserQueryParams.fromQueryString(searchParams.toString()))

    useEffect(() => {
        if (initialSearchValue.filters) {
            for (const filter of initialSearchValue.filters) {
                if (filter.field === 'firstName') {
                    setSearchValue(filter.value!)
                }
            }
        }
    }, [])

    useEffect(() => {
        const prevFilters = initialSearchValue.filters ? initialSearchValue.filters : []
        const queryParams = new QueryParams({
            filters: [
                ...prevFilters,
                {
                    field: 'firstName',
                    rule: 'like',
                    value: searchValue
                }
            ]
        })
        window.history.pushState(null, '', `?${queryParams.toQueryString()}`)
    }, [searchValue])

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
                            column={table.getColumn("firstName")}
                            title="First Name"
                            options={
                                [{
                                    value: 'Leul',
                                    label: "Leul"
                                }]
                            }
                        />
                    )}
                    {/* {table.getColumn("transactionType") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("transactionType")}
                            title="Transaction"
                            options={transactionTypes}
                        />
                    )}
                    {table.getColumn("deliverableType") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("deliverableType")}
                            title="Deliverable"
                            options={deliverableTypes}
                        />
                    )}
                    {table.getColumn("verificationStatus") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("verificationStatus")}
                            title="Verification"
                            options={verificationStatuses}
                        />
                    )}
                    {table.getColumn("bidStatus") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("bidStatus")}
                            title="Bid Status"
                            options={bidStatuses}
                        />
                    )}
                    {table.getColumn("paymentStatus") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("paymentStatus")}
                            title="Payment Status"
                            options={paymentStatuses}
                        />
                    )}
                    {table.getColumn("paybackStatus") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("paybackStatus")}
                            title="Payback Status"
                            options={paymentStatuses}
                        />
                    )} */}
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