'use client'

import { DataTable } from '@/components/admin/data-table/data-table'
import { matchPoolColumns } from '@/components/admin/match-pool-columns'
import { useAppSelector } from '@/lib/hooks'
import { useGetMatchPoolQuery } from '@/lib/matchmaking/api'

export default function AdminPage() {
    const user = useAppSelector((state) => state.auth.user)
    const { data: membersInPool, isLoading } = useGetMatchPoolQuery(undefined, { skip: !user })

    return (
        <div className='p-5 space-y-5'>
            <h1 className='text-2xl font-bold'>Match Pool</h1>

            {<DataTable
                data={membersInPool ? membersInPool : []}
                columns={matchPoolColumns}
                isLoading={isLoading}
            />}
        </div>

    )
}
