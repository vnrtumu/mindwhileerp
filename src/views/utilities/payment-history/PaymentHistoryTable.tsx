'use client';

import React, { useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import { Badge } from 'src/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'src/components/ui/table';
import type { CellContext, ColumnDef, SortingState } from '@tanstack/react-table';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'src/components/ui/select';
import { Label } from 'src/components/ui/label';
import CardBox from 'src/components/shared/CardBox';
import { toTitleCase } from 'src/components/utilities/table/DataTable';

interface PaymentHistoryTableProps<T> {
    data?: T[];
}

export const PaymentHistoryTable = <T extends Record<string, unknown>>({
    data = [],
}: PaymentHistoryTableProps<T>) => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);

    const renderValue = (val: unknown): React.ReactNode => {
        if (val === null || val === undefined) return '-';
        if (typeof val === 'object') return JSON.stringify(val);
        return String(val);
    };

    const paginationOptions = useMemo(() => {
        const sizes = [5, 10, 20, 50];
        return sizes.filter((size) => size <= data.length);
    }, [data.length]);

    const columns = useMemo<ColumnDef<T, unknown>[]>(() => {
        if (!data.length) return [];

        const keys = Object.keys(data[0]).filter((key) => {
            const val = data[0][key];
            return !Array.isArray(val);
        });

        const baseColumns = keys.map((col) => ({
            accessorKey: col,
            header: toTitleCase(col.replace(/([A-Z])/g, ' $1').trim()),
            cell: (info: CellContext<T, unknown>) => {
                const value = info.getValue();

                // Render status as badge
                if (col.toLowerCase() === 'status') {
                    return (
                        <Badge className="px-3 py-1 rounded bg-warning text-warning-foreground hover:bg-warning/90">
                            {renderValue(value)}
                        </Badge>
                    );
                }

                // Render order ID
                if (col.toLowerCase().includes('orderid')) {
                    return (
                        <span className="text-gray-900 dark:text-white font-medium">
                            {renderValue(value)}
                        </span>
                    );
                }

                // Render school name
                if (col.toLowerCase().includes('schoolname')) {
                    return (
                        <span className="text-gray-900 dark:text-white font-semibold">
                            {renderValue(value)}
                        </span>
                    );
                }

                return (
                    <span className="text-gray-900 dark:text-white font-medium">
                        {renderValue(value)}
                    </span>
                );
            },
            enableSorting: true,
            enableGlobalFilter: true,
        }));

        return baseColumns;
    }, [data]);

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter, sorting },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        globalFilterFn: 'includesString',
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: paginationOptions[0] || 10 } },
    });

    const handleDownload = () => {
        if (!data.length) return;

        const headers = columns.map((col) => String(col.header));
        const rows = data.map((item) =>
            columns.map((col) => {
                const column = col as unknown as { accessorKey?: string };
                const accessorKey = column.accessorKey;
                const value = accessorKey ? item[accessorKey] : '';
                if (Array.isArray(value)) return `"[array]"`;
                return `"${String(value ?? '').replace(/"/g, '""')}"`;
            }),
        );

        const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'payment-history.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <CardBox>
            <div>
                {data.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No data available.</p>
                ) : (
                    <>
                        <div className="p-4 pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <h3 className="text-xl font-semibold">All Subscription Payments</h3>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <Input
                                    type="text"
                                    className="w-full sm:w-80 placeholder:text-gray-400 dark:placeholder:text-white/20"
                                    value={globalFilter ?? ''}
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                    placeholder="Search your relevant items..."
                                />
                                <Button onClick={handleDownload} className="p-2 px-4 rounded-md shrink-0">
                                    <Icon icon="material-symbols:download-rounded" width={24} height={24} />
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto border rounded-md border-ld">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableHead key={header.id} className="cursor-pointer select-none px-0">
                                                    {header.isPlaceholder ? null : (
                                                        <Button
                                                            className="flex items-center gap-1 px-4 bg-transparent hover:bg-transparent text-dark dark:text-white font-semibold"
                                                            onClick={header.column.getToggleSortingHandler()}
                                                        >
                                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                                            {
                                                                {
                                                                    asc: <ArrowUp className="w-4 h-4 inline" />,
                                                                    desc: <ArrowDown className="w-4 h-4 inline" />,
                                                                }[header.column.getIsSorted() as string] ??
                                                                <ChevronsUpDown className="w-2 h-2 inline" />
                                                            }
                                                        </Button>
                                                    )}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHeader>

                                <TableBody>
                                    {table.getRowModel().rows.length > 0 ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow key={row.id} className="hover:bg-primary/10 transition-colors">
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id} className="text-gray-700 dark:text-white/70">
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="text-center p-6 text-gray-500 dark:text-white/70 font-medium"
                                            >
                                                No results found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border dark:border-white/10">
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    variant={'secondary'}
                                >
                                    Previous
                                </Button>
                                <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                    Next
                                </Button>
                            </div>

                            <div className="text-forest-black dark:text-white/90 font-medium text-base">
                                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                            </div>

                            <div className="flex items-center gap-2">
                                <Label
                                    htmlFor="pageSize"
                                    className="mr-0 text-forest-black dark:text-white/90 text-base font-medium whitespace-nowrap min-w-32"
                                >
                                    Show:
                                </Label>
                                <Select
                                    value={String(table.getState().pagination.pageSize)}
                                    onValueChange={(value) => table.setPageSize(Number(value))}
                                >
                                    <SelectTrigger className="!w-18 cursor-pointer">
                                        <SelectValue placeholder="Page size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {paginationOptions.map((size) => (
                                            <SelectItem key={size} value={String(size)}>
                                                {size}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <span className="text-forest-black dark:text-white/90 font-medium text-base">entries</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </CardBox>
    );
};
