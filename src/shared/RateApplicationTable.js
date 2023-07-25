import React,{useState,useEffect} from "react";
import {useReactTable} from "@tanstack/react-table";
import Table from "react-bootstrap/Table";

/**
 * Provides a table view for data
 * @param columns Array of Columns
 * @param data can be either a simple array or promise
 * @constructor
 * @see <a href="https://react-table-v7.tanstack.com/docs/api/useTable#column-options">Column</a>
 */
const RateApplicationTable = ({columns, data}) => {
    const [tableData, setTableData] = useState([]);
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


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useReactTable({
        columns,
        data:tableData,
    })

    if (loading){
        return (<div>loading...</div>)
    }

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