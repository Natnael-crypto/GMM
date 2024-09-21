'use client'

import { DataTable } from '@/components/admin/data-table/data-table'
import { columns } from '@/components/admin/user-columns'
import { useAppSelector } from '@/lib/hooks'
import { useLazyGetUsersQuery } from '@/lib/user/api'
import { QueryParams } from '@/lib/user/types'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
    const user = useAppSelector((state) => state.auth.user)

    const searchParams = useSearchParams()

    useEffect(() => {
        console.log(searchParams.toString())
    }, [searchParams])

    const [trigger, result, lastPromiseInfo] = useLazyGetUsersQuery()

    useEffect(() => {
        if (user) {
            // trigger(new QueryParams({ sort: { field: 'firstName', direction: 'desc' } }).toQueryString())
            trigger(searchParams.toString())
        }
    }, [user, trigger, searchParams])

    return (
        <div className='p-5 space-y-5'>
            <h1 className='text-2xl font-bold'>Users</h1>

            {<DataTable
                data={result.data ? result.data : []}
                columns={columns}
                isLoading={result.isLoading}
            />}
        </div>

    )
}
