'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { setQueryString } from '@/lib/admin/slice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { FilterRule, UserField, UserQueryParams } from '@/lib/user/types'
import { useEffect, useRef } from 'react'

const labels: Record<FilterRule, string> = {
    'eq': '=',
    'neq': '≠',
    'gt': '>',
    'lt': '<',
    'gte': '≥',
    'lte': '≤',
    'like': '🔎︎',
    'nlike': '⊘',
    'in': 'In',
    'nin': 'Not in',
    'isnull': 'Is null',
    'isnotnull': 'Is not null',
}


export default function FilterOptionItem({ column, option }: { column: any, option: FilterRule }) {
    const queryString = useAppSelector((state) => state.adminUserFilter.queryString);
    const dispatch = useAppDispatch()

    const initQueryParams = UserQueryParams.fromQueryString(queryString)
    const filter = initQueryParams.filters[column.id as UserField]?.[option]
    const isActive = filter ? true : false

    const inputRef = useRef<HTMLInputElement>(null)

    const isValueRequired = option !== 'isnull' && option !== 'isnotnull'

    useEffect(() => {
        if (filter && isValueRequired && inputRef.current) {
            inputRef.current.value = filter.value ?? ''
        }
    }, [])

    const handleCheckedChange = (checked: boolean) => {
        const queryParams = new UserQueryParams(initQueryParams)

        if (checked) {
            if (!queryParams.filters[column.id as UserField]) {
                queryParams.filters[column.id as UserField] = {
                    [option]: isValueRequired ? {
                        value: inputRef.current?.value,
                    } : {},
                }
            } else {
                queryParams.filters[column.id as UserField]![option] = isValueRequired ? {
                    value: inputRef.current?.value,
                } : {}
            }
        } else {
            if (queryParams.filters[column.id as UserField]) {
                queryParams.filters[column.id as UserField]![option] = undefined
            }
        }

        dispatch(setQueryString(queryParams.toQueryString()))
    }

    return <div className='flex gap-2 items-center justify-between flex-nowrap text-nowrap w-full'>
        <div className='flex items-center gap-3'>
            <span className='text-nowrap'>{labels[option]}</span>
            {!(option === 'isnull' || option === 'isnotnull') && <Input ref={inputRef} className='text-xs h-7 text-muted-foreground hover:text-muted-foreground' />}
        </div>

        <Checkbox
            checked={isActive}
            onCheckedChange={handleCheckedChange}
        />
    </div>
}
