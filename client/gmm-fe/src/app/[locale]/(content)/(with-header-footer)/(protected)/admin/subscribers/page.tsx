'use client'

import { DataTable } from '@/components/admin/data-table/data-table'
import { matchColumns } from '@/components/admin/match-columns'
import { useAppSelector } from '@/lib/hooks'
import { useGetAllMatchesQuery } from '@/lib/matchmaking/api'

export default function AdminPage() {
    const user = useAppSelector((state) => state.auth.user)
    const { data: matches, isLoading } = useGetAllMatchesQuery(undefined, { skip: !user })

    return (
        <div className='p-5 space-y-5'>
            <h1 className='text-2xl font-bold'>Subscribers</h1>

            {<DataTable
                data={matches ? matches : []}
                columns={matchColumns}
                isLoading={isLoading}
            />}
        </div>

    )
}
