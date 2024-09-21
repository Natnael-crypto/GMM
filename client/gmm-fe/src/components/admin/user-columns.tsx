import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/lib/schemas/user';
import { DataTableColumnHeader } from './data-table/table-column-header';


export const columns: ColumnDef<User>[] = [
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
        accessorKey: 'firstName',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="First Name" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'lastName',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Last Name" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Email" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'phoneNumber',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Phone" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'age',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Age" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'gender',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Gender" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'height',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Height" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'weight',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Weight" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'country',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Country" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'city',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="City" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'skinColor',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Skin Color" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'languages',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Languages" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{(row.getValue(column.id) as string[])?.join(', ') ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'nationality',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Nationality" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'numberOfChildren',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Number of Children" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'ageOfOldestChild',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Age of Oldest Child" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'ageOfYoungestChild',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Age of Youngest Child" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'sunniMadhaib',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Sunni Madhaib" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'religiousPractice',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Religious Practice" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'bornMuslim',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Born Muslim" />
            );
        },
        cell: ({ row, column }) => {
            return (
                <div className="max-w-64 text-ellipsis overflow-hidden text-nowrap">
                    <span className="text-xs">{row.getValue(column.id) ?? 'N/A'}</span>
                </div>
            );
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'drinks',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Drinks" />
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
        accessorKey: 'smokes',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Smokes" />
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
        accessorKey: 'drugs',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Drugs" />
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
        accessorKey: 'tattoos',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Tattoo(s)" />
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
        accessorKey: 'maritalStatus',
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Marital Status" />
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
];