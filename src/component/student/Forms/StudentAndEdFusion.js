import React, { useState, useEffect } from 'react'
import axios from 'axios'
import StudentForm from './StudentForm/StudentForm'
import { useParams } from 'react-router-dom'
import { Row, Button, Col } from 'react-bootstrap'


export default function StudentAndEdFusion() {
    const { id } = useParams()
    const [student, setStudent] = useState(undefined)
    const [edFusionStudent, setEdFusionStudent] = useState({})

    useEffect(() => {
        axios.get(`/student/${id}`).then(response => {
            setStudent(response.data)
        }
        )
    }, [])

    return (
        <Row>
            <Col>
                {student ?
                    <StudentForm student={student} />
                    : <h6 className="text-center mt-4">Loading...</h6>
                }
            </Col>
        </Row>
    )
}
