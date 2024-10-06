import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table/table-column-header';
import { Match } from '@/lib/matchmaking/types';
import { formatLocalizedDate } from '@/lib/format';


export const matchColumns: ColumnDef<Match>[] = [
    {
        accessorKey: 'index',
        header: () => {
            return (
                <div className="text-xs px-5 max-w-64 text-ellipsis overflow-hidden text-nowrap">#</div>
            );
        },
        cell: ({ row, table }) => {
            return <div className="px-5 max-w-64 text-ellipsis overflow-hidden text-nowrap">{table.getFilteredRowModel().rows.indexOf(row) + 1}</div>;
        }
    },
    {
        accessorKey: 'maleUser',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Male" options={['eq', 'neq', 'lt', 'gt', 'lte', 'gte', 'isnull', 'isnotnull']} />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.original.maleUser?.firstName} {row.original.maleUser?.lastName}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'femaleUser',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Female" options={['eq', 'neq', 'lt', 'gt', 'lte', 'gte', 'isnull', 'isnotnull']} />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.original.femaleUser?.firstName} {row.original.femaleUser?.lastName}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'isActive',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Is Active" options={['eq', 'neq', 'isnull', 'isnotnull']} />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id)?.toString() ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Match Date" options={['eq', 'neq', 'isnull', 'isnotnull']} />
            );
        },
        cell: ({ row, column }) => {
            const date = row.getValue(column.id) as Date;

            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{date ? formatLocalizedDate(new Date(date)) : 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
];