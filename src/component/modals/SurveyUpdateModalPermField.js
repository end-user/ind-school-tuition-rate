import React from 'react'
import {Button, Col, Form} from 'react-bootstrap'
import {useNavigate} from 'react-router'
import * as yup from 'yup'
import {Formik} from 'formik'
import axios from 'axios'

export default function SurveyUpdateModalPermField({id}) {
    let navigate = useNavigate()

    const submitSurveyUpdate = async (data) => {
        const permNumber = data.permNumber
        try {
            let result = await axios.put(`/surveyPerm/${id}/${permNumber}`, data)
            if (result.status === 200) {
                setTimeout(() => {
                    navigate(`/form/${id}`)
                }, 1500)
            }
        } catch (error) {
        }
    }

    const schema = yup.object().shape({
        permNumber: yup
            .string()
            .matches(/^\d+$/, 'Please enter a valid PERM Number'),
    })

    return (
        <Formik
            validationSchema={schema}
            onSubmit={submitSurveyUpdate}
            initialValues={{permNumber: 0}}
        >
            {({handleSubmit, handleChange, values, errors}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="permNumber">
                            <h5>Or enter PERM Number below</h5>
                            <Form.Label>Perm Number</Form.Label>
                            <Form.Control
                                type="string"
                                name="permNumber"
                                value={values.permNumber}
                                onChange={handleChange}
                                isInvalid={!!errors.permNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                {'*required'}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Button type="submit">Update PERM number</Button>
                </Form>
            )}
        </Formik>
    )
}
