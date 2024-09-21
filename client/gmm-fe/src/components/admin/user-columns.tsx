import { ColumnDef } from '@tanstack/react-table';

import { CaretSortIcon } from '@radix-ui/react-icons';
import { User } from '@/lib/schemas/user';
import { DataTableColumnHeader } from './data-table/table-column-header';




export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'index',
        header: () => {
            return (
                <div className="px-5 max-w-64 text-ellipsis overflow-hidden text-nowrap">#</div>
            );
        },
        cell: ({ row, table }) => {
            return <div className="px-5 max-w-64 text-ellipsis overflow-hidden text-nowrap">{table.getFilteredRowModel().rows.indexOf(row) + 1}</div>;
        }
    },
    {
        accessorKey: 'firstName',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="First Name" />
            );
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-sm">{row.original.firstName}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: 'lastName',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Last Name" />
            );
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-sm">{row.original.lastName}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: false,
    },
];