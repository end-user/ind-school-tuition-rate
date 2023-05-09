import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

export default function StudentList({ data }) {

    let history = useNavigate()
    const columns = useMemo(() => [
        { label: "First Name", value: "firstName" },
        { label: "Last Name", value: "lastName" },
        { label: "PERM Number", value: "permNum" },
        { label: "DOB", value: "birthDate" },
        { label: "School", value: "enrollingAt" },
        { label: "School District", value: "schoolDistrict" },
        {label: "Grade", value:"grade"}
    ])

    const selectStudent = (e) => {
        let id = e.target.parentNode.id
        history.push(`/student/${id}`)
    }


    return (
        <Table responsive striped bordered hover size="sm" className="mt-3">
            <thead>
                <tr>
                    {columns ?
                        columns.map((column, i) => (
                            <th className="pointer-hover" id={column.value} key={i}>{column.label}</th>
                        ))
                        : null}
                </tr>
            </thead>
            <tbody>
                {(data && data.length>0) ?
                    data.map((student, i) => (
                        <tr key={i} className="pointer-hover" id={student.permNumber} onClick={selectStudent}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.permNumber}</td>
                            <td>{new Date(student.birthDate).toLocaleDateString('en-US', {timeZone: 'UTC'})}</td>
                            <td>{student.enrollingAt}</td>
                            <td>{student.enrollingAtDistrict}</td>
                            <td>{student.gradeEntering}</td>

                        </tr>
                    ))
                    : null}
            </tbody>
        </Table>
    )
}
