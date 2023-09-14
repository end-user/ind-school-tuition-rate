import {useEffect, useState} from "react";
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";


/**
 * Provides a table view for data
 * @param columns Array of Columns
 * @param data can be either a simple array or promise
 * @constructor
 * @see <a href="https://react-table-v7.tanstack.com/docs/api/useTable#column-options">Column</a>
 */


const RateApplicationTable = ({columns, data}: {
    columns: ColumnDef<any, any>[],
    data: any[] | Promise<any>
}) => {
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

    const doComment = (comment:string) => {
        if (comment)  return (
            <div className={'row'}>
                <div className={'offset-3 col-3'}>{comment}</div>
            </div>)
    }


    return (
        <div className={'table '}>
            <div className={'thead border-bottom'}>
                {table.getHeaderGroups()?.map(headerGroup => (
                    <div className={'row'} key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <div className={'col'} key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}</div>
                        ))}
                    </div>
                ))}
            </div>
            <div className={'tbody'}>
                {table.getRowModel().rows.map(row => (
                    <div className={'border-bottom'} key={`${row.id}-details`}>
                        <div className={'row'}>
                            {row.getVisibleCells().map(cell => <div className={'col'} key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>)}
                        </div>
                        {doComment(row.original.comment)}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RateApplicationTable;