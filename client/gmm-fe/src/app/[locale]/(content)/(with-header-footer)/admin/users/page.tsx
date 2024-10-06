'use client'

import { DataTable } from '@/components/admin/data-table/data-table'
import { columns } from '@/components/admin/user-columns'
import { useAppSelector } from '@/lib/hooks'
import { useLazyGetUsersQuery } from '@/lib/user/api'
import { useEffect } from 'react'
import { useDebounce } from 'use-debounce'

export default function AdminPage() {
    const user = useAppSelector((state) => state.auth.user)
    const queryString = useAppSelector((state) => state.adminUserFilter.queryString);
    const [debouncedSearchParams] = useDebounce(queryString, 500)

    const [trigger, result, lastPromiseInfo] = useLazyGetUsersQuery()

    useEffect(() => {
        if (user) {
            trigger(debouncedSearchParams)
        }
    }, [user, trigger, debouncedSearchParams])

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
