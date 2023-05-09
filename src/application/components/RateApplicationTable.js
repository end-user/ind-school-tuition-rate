import React from "react";
import {useTable} from "react-table";
import Table from "react-bootstrap/Table";

/**
 * Provides a table view for data
 * @param columns Array of Columns
 * @param data
 * @constructor
 * @see <a href="https://react-table-v7.tanstack.com/docs/api/useTable#column-options">Column</a>
 */
const RateApplicationTable = ({columns, data}) => {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })


    return (
        <Table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
}

export default RateApplicationTable;