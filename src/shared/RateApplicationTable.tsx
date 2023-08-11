import {useEffect, useState} from "react";
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import Table from "react-bootstrap/Table";

/**
 * Provides a table view for data
 * @param columns Array of Columns
 * @param data can be either a simple array or promise
 * @constructor
 * @see <a href="https://react-table-v7.tanstack.com/docs/api/useTable#column-options">Column</a>
 */

const RateApplicationTable = ({columns, data}: { columns: ColumnDef<any, any>[], data: any[] | Promise<any> }) => {
    const [tableData, setTableData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (Array.isArray(data)) {
            setTableData(data);
            setLoading(false);
        } else if (data instanceof Promise) {
            data.then((fetchedData) => {
                setTableData(fetchedData);
                setLoading(false);
            });
        }
    }, [data]);


    const table = useReactTable({
        columns,
        data: tableData,
        getCoreRowModel: getCoreRowModel(),
    })

    if (loading) {
        return (<div>loading...</div>)
    }

    return (
        <Table>
            <thead>
            {table.getHeaderGroups()?.map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id}>{header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </Table>
    )
}

export default RateApplicationTable;