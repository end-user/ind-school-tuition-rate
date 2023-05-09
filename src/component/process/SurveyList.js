import React, { useState, useEffect } from "react";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import { mdiSortAlphabeticalAscending, mdiSortAlphabeticalDescending, mdiLoading, mdiDelete, mdiBinoculars } from '@mdi/js';
import Icon from '@mdi/react'
import axios from 'axios'
import GlobalFilter from './GlobalFilter'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import DeleteSurveyModal from "../modals/DeleteSurveyModal";

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
const SurveyList = ({
    setShowSurveyUpdateModal,
    columns,
    data,
    totalResults,
    setSortField,
    setSortOrder,
    sortOrder,
    sortField,
    loading,
    setSurveyInitialVals
}) => {
    let history = useNavigate()
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        // Get the state from the instance
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }, // Pass our hoisted table state
            manualPagination: true, // Tell the usePagination
            // hook that we'll handle our own data fetching
            // This means we'll also have to provide our own
            // tot.
        },
        useGlobalFilter,
        usePagination,
    )
    const [noPermLoading, setNoPermLoading] = useState(false)
    const [showDeleteSurveyModal, setShowDeleteSurveyModal] = useState(false)
    const [deleteSurveyId, setDeleteSurveyId] = useState(null)
    // Methods
    const handleRowClick = async (event, i) => {
        let index = event.target.dataset.rowid;
        let student = page[index].original;
        let id = student.responseId;
        let perm = student.permNumber;
        // axios request
        if (perm) {
            localStorage.setItem("yCoord", window.scrollY)
            history.push(`/form/${id}`)

        } else {
            // Set modal edit for updating survey, then upon close, update and research the database.
            setNoPermLoading(true)
            let studentData = await axios.get(`/survey/${id}`)
            setNoPermLoading(false)
            setSurveyInitialVals({ ...studentData.data, id: id })
            setShowSurveyUpdateModal(true)
        }
        event.preventDefault()
    }
    const handleSetSortField = (event, i) => {
        event.preventDefault()
        const field = event.target.dataset.id_ref
        field === 'DOB' ? setSortField('birthDate') : setSortField(field)
        sortOrder === 'asc' ? setSortOrder('desc') : setSortOrder('asc')
    }

    const [showIcons, setShowIcons] = useState({})
    const showRowIcons = (e) => {
        let id = (e.target.parentNode.dataset.rowid)
        if (id) {
            setShowIcons({ [id]: true })
        }
    }
    const hideRowIcons = (e) => {
        let id = (e.target.parentNode.dataset.rowid)
        if (id) {
            setShowIcons({ [id]: false })
        }
    }
    const deleteSurvey = (e) => {
        let id = e.target.parentNode.dataset.id_ref
        setDeleteSurveyId(id)
        setShowDeleteSurveyModal(true)
    }


    // Render the UI for your table
    return (

        <>
            <Modal centered show={noPermLoading} >
                <Modal.Body>
                    <h3 className="d-flex justify-content-center">Loading...</h3></Modal.Body>
            </Modal>
            {
                loading ?
                    <Icon path={mdiLoading} style={{ position: "absolute", top: 0, left: 0 }} spin color="blue" size={3} />
                    : null
            }
            <h5 className="text-center mb-0 p-2">Home Language Surveys</h5>
            <hr />
            <div className="alert-info">Select a survey from the table below to compare to student on file.</div>
            <div className="container m-0 p-0 row">
                <GlobalFilter
                    totalResults={totalResults}
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </div>
            <table className={'table '} {...getTableProps()} >
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr className="thead-light" {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => {
                                return (
                                    column.id !== 'DOB' ?
                                        <th onClick={handleSetSortField} data-id_ref={column.id} className="bg-secondary pointer-hover" {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                            {(sortOrder === 'asc' && sortField === column.id) ? <Icon size={1} data-id_ref={column.id} color={'orange'} path={mdiSortAlphabeticalAscending} /> : null}
                                            {(sortOrder === 'desc' && sortField === column.id) ? <Icon size={1} data-id_ref={column.id} color={'orange'} path={mdiSortAlphabeticalDescending} /> : null}
                                        </th>
                                        : <th onClick={handleSetSortField} data-id_ref={column.id} className="bg-secondary pointer-hover" {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                            {(sortOrder === 'asc' && sortField === 'birthDate') ? <Icon size={1} data-id_ref={column.id} color={'orange'} path={mdiSortAlphabeticalAscending} /> : null}
                                            {(sortOrder === 'desc' && sortField === 'birthDate') ? <Icon size={1} data-id_ref={column.id} color={'orange'} path={mdiSortAlphabeticalDescending} /> : null}
                                        </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (

                            <tr onMouseEnter={showRowIcons} onMouseLeave={hideRowIcons} className={"pointer-hover align-items-center"} key={i} data-rowid={row.id} data-perm={row.values.permNumber} data-id_ref={row.original.responseId} data-first={row.original.firstName} {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                                <td style={showIcons[row.id] ? { opacity: "100%", zIndex: 1000 } : { opacity: "0%" }} data-rowid={row.id}>
                                    <button size={.8} className="btn btn-primary" color={'#129B00'} path={mdiBinoculars} onClick={handleRowClick} data-rowid={row.id} >View</button>
                                </td>
                                <td data-id_ref={row.original.responseId} style={showIcons[row.id] ? { opacity: "100%", zIndex: 1000 } : { opacity: "0%" }} onClick={deleteSurvey} data-rowid={row.id}>
                                    <Icon data-id_ref={row.original.responseId} size={1} color={'#FF0000B0'} path={mdiDelete} data-rowid={row.id} />
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <DeleteSurveyModal showDeleteSurveyModal={showDeleteSurveyModal} setShowDeleteSurveyModal={setShowDeleteSurveyModal} responseId={deleteSurveyId} />
        </>
    )
}
export default SurveyList