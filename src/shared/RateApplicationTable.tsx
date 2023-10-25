import React, {useEffect, useState} from "react";
import {ColumnDef, flexRender, getCoreRowModel, Row, useReactTable} from "@tanstack/react-table";
import {Button, Col} from "react-bootstrap";
import {Field, useFormikContext} from "formik";
import {
    AbstractLedgerEntry,
    AllowableExpense,
    Benefit,
    ContractedService,
    Revenue,
    StaffSalary
} from "./ts-model-data.ts";


/**
 * Provides a table view for data
 * @param columns Array of Columns
 * @param data can be either a simple array or promise
 * @constructor
 * @see <a href="https://react-table-v7.tanstack.com/docs/api/useTable#column-options">Column</a>
 */
type CommentHandlers = {
    editCommentRowId: number | undefined,
    setCommentRowId: React.Dispatch<React.SetStateAction<number | undefined>>
};
const RateApplicationTable = <TData, >(
    {columns, data, commentHandlers}: {
        columns: ColumnDef<TData, undefined>[],
        data: TData[] | Promise<TData>,
        commentHandlers?: CommentHandlers
    }) => {
    const {editCommentRowId, setCommentRowId} = commentHandlers ||
    {
        editCommentRowId: undefined, setCommentRowId: () => {
        }
    };
    const [tableData, setTableData] = useState<TData[]>([])
    const [loading, setLoading] = useState(true)
    const formikContext = useFormikContext<StaffSalary | Benefit | AllowableExpense | ContractedService | Revenue>();
    useEffect(() => {
        if (Array.isArray(data)) {
            setTableData(data);
            setLoading(false);
        } else if (data instanceof Promise) {
            data.then((fetchedData) => {
                setTableData(fetchedData as TData[]);
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

    const doComment = (row: Row<TData>) => {
        const id = row.index
        const comment = (row.original as AbstractLedgerEntry).comment
        // if there is text to display, but there's no edit row id
        if (comment && editCommentRowId === undefined) return (
            <div className={'row'}>
                <div className={'offset-3 col-3'}>{comment}</div>
            </div>)
        // when edit row id is set, regardless of whether there's data.
        if (id === editCommentRowId) {
            formikContext.initialValues.comment = comment
            return (
                <div className={'row'}>
                    <Col sm={8} className={'offset-2'}>
                        <Field as={"textarea"}
                               className={"form-control"}
                               name="comment"
                               rows={1}
                               placeholder={"comments..."}
                               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                   formikContext.handleChange(e)
                               }}
                        /><br/>
                        <Button type={"button"}
                                onClick={() => {
                                    const tempData: AbstractLedgerEntry[] = tableData as AbstractLedgerEntry[]
                                    tempData[id].comment = formikContext.values.comment
                                    setTableData(tempData as never[])
                                    setCommentRowId(undefined)
                                }}>
                            Save
                        </Button>
                    </Col>
                </div>
            )
        }
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
                                    )}
                            </div>
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
                        {(row.original as AbstractLedgerEntry).comment !== undefined && doComment(row)}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default RateApplicationTable;