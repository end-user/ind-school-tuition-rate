import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import React, {useMemo, useState} from "react";
import {Field, Formik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import RateApplicationTable from "./RateApplicationTable";

const StaffSalaries = () => {
    const [salaryData, setSalaryData] = useState(
        [
            {
                'id': 510,
                'position': 'English Instructor',
                'category': 'staff',
                'status': 'employed',
                'fte': true,
                'speedu': 0,
                'pay': '$ 60,000',
                'actual': '$ 63,535',
                'budget': '$ 63,535'
            }
        ]
    )
    const deleteRow = async (id) => {
        //todo this will be a call to the server
        console.log(`delete table row ${id}`)
        const tmpData = [...salaryData]
        tmpData.splice(id, 1)
        setSalaryData(tmpData)
    }
    const addRow = async (values) => {
        const tmpData = [...salaryData]
        tmpData.push(values)
        setSalaryData(tmpData)
    };
    const cols = useMemo(() =>
            [
                {
                    Header: 'Position/Title',
                    accessor: 'position', // accessor is the "key" in the data
                },
                {
                    Header: 'Category',
                    accessor: 'category',
                },
                {
                    Header: 'Status',
                    accessor: 'status',
                },
                {
                    Header: 'FTE',
                    accessor: 'fte',
                },
                {
                    Header: 'SpeEdu (%)',
                    accessor: 'speedu',
                },
                {
                    Header: 'Annualized Pay',
                    accessor: 'pay',
                },
                {
                    Header: 'FY22 Actual',
                    accessor: 'actual',
                },
                {
                    Header: 'FY23 Budget',
                    accessor: 'budget',
                }, {
                Header: '',
                id: 'delete',
                accessor: 'delete',
                Cell: (tableProps) => (
                    <Button onClick={() => deleteRow(tableProps.row.index)}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </Button>
                ),
            },
            ],
        [deleteRow]
    )

    return (
        <Formik enableReinitialize
                onSubmit={addRow}
                initialValues={{
                    'position': '',
                    'category': '',
                    'status': '',
                    'speedu': 0,
                    'fte': '',
                }}
        >
            {
                ({
                     handleSubmit,
                 }) => (
                    <>
                        <Form onSubmit={handleSubmit}>
                            <Card>
                                <Card.Body className={'bg-info text-dark bg-opacity-10'}>
                                    <Form.Group as={Row}>
                                        <Form.Label column={true} sm={'2'}>Position/Title</Form.Label>
                                        <Col sm={'4'}>
                                            <Field name="position"
                                                   as={Form.Select}
                                                   required
                                            >
                                                <option hidden value=''>Choose a Position/Title</option>
                                                <option>Executive Director</option>
                                                <option>Assistant Director</option>
                                                <option>Education Director</option>
                                                <option>Program Director</option>
                                                <option>Science Instructor</option>
                                                <option>English Instructor</option>
                                                <option>History/Social Studies Instructor</option>
                                                <option>Math Instructor</option>
                                                <option>Elementary Ed Instructor</option>
                                                <option>Administrative Assistant</option>
                                                <option>Clinical Coordinator</option>
                                                <option>Clinical Case Manager</option>
                                                <option>Special Education Teacher</option>
                                                <option>Special Education Case Manager</option>
                                                <option>Program Coordinator</option>
                                                <option>School Social Worker</option>
                                                <option>School to Home Coordinator</option>
                                                <option>Outdoor Education Instructor</option>
                                                <option>Community Based Learning Instructor</option>
                                            </Field>
                                        </Col>
                                        <Form.Label column={true} sm={'1'}
                                                    className={"offset-sm-2"}>Category</Form.Label>
                                        <Col sm={'3'}>
                                            <Field name={"category"}
                                                   as={Form.Select}
                                                   required
                                            >
                                                <option hidden value=''>Choose a Category</option>
                                                <option>staff</option>
                                                <option>administration</option>
                                            </Field>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column={true}>Status</Form.Label>
                                        <Col>
                                            <Field name="status"
                                                   as={Form.Select}
                                                   required
                                            >
                                                <option hidden value=''>Choose a Status</option>
                                                <option>employed</option>
                                                <option>retired</option>
                                            </Field>

                                        </Col>
                                        <Form.Label column={true}>SpeEdu</Form.Label>
                                        <Col>
                                            <InputGroup>
                                                <Field as={"input"}
                                                       className={"form-control"}
                                                       name="speedu"
                                                       type="number"/>
                                                <InputGroup.Text>%</InputGroup.Text>
                                            </InputGroup>
                                        </Col>

                                        <Form.Label column={true}>FTE</Form.Label>
                                        <Col>
                                            <Field name="fte"
                                                   as={Form.Select}
                                                   required
                                            >
                                                <option hidden value=''>FTE?</option>
                                                <option>yes</option>
                                                <option>no</option>
                                            </Field>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column={true}>Pay</Form.Label>
                                        <Col>
                                            <InputGroup>
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Field as={"input"}
                                                       className={"form-control"}
                                                       name="pay"
                                                       type="number"
                                                       required
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Form.Label column={true}>FY22 Actual</Form.Label>
                                        <Col>
                                            <InputGroup>
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Field as={"input"}
                                                       className={"form-control"}
                                                       name="actual"
                                                       type="number"
                                                       required
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Form.Label column={true}>FY23 Budget</Form.Label>
                                        <Col>
                                            <InputGroup>
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Field as={"input"}
                                                       className={"form-control"}
                                                       name="budget"
                                                       type="number"
                                                       required
                                                />
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>
                                </Card.Body>
                                <Card.Footer>
                                    <Button type={"submit"}>Add</Button>
                                </Card.Footer>
                            </Card>
                        </Form>
                        <RateApplicationTable columns={cols} data={salaryData}/>
                    </>)
            }
        </Formik>
    );
}
export default StaffSalaries