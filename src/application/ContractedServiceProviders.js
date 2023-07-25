import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import {Field, Formik} from "formik";
import RateApplicationTable from "../shared/RateApplicationTable";
import {currencyFormatter} from "../services/formatter";

const ContractedServiceProviders = ({data, setData}) => {
    const deleteRow = async (id) => {
        //todo this will be a call to the server
        console.debug(`delete table row ${id}`)
        const tmpData = [...data]
        tmpData.splice(id, 1)
        setData(tmpData)
    }
    const addRow = async (values) => {
        console.debug('got: ', values)
        const tmpData = [...data]
        tmpData.push(values)
        setData(tmpData)
    };
    const [options, setOptions] = useState([
        'Physical Therapist',
        'Occupational Therapist',
        'Speech Language Pathologist',
        'Clinical Provider',
        'Payroll Specialist',
        'IT support contract',
        'Janitorial Services, snow plowing and trash/recycling removal',
        'Nurse/Medical Provider',
    ])

    const cols =
        [
            {
                Header: 'Service',
                accessor: 'service', // accessor is the "key" in the data
            },
            {
                Header: 'FTE%',
                accessor: 'fte',
            },
            {
                Header: 'FY22 Actual',
                accessor: 'actual',
                Cell: ({value}) => currencyFormatter.format(value)
            },
            {
                Header: 'FY23 Budget',
                accessor: 'budget',
                Cell: ({value}) => currencyFormatter.format(value)
            }, {
            Header: '',
            id: 'delete',
            accessor: 'delete',
            Cell: (tableProps) => (
                <Button variant={'link'} className={'text-success'} onClick={() => deleteRow(tableProps.row.index)}>
                    <FontAwesomeIcon icon={faSquareXmark} />
                </Button>
            ),
        },
        ]

    return (
        <Formik enableReinitialize
                onSubmit={addRow}
                initialValues={{'service': '', 'fte': '', 'actual': '', 'budget': ''}}
        >
            {
                ({
                     handleChange,
                     handleSubmit,
                 }) => (
                    <>
                        <Form onSubmit={handleSubmit}>
                            <Card>
                                <Card.Body className={'bg-info text-dark bg-opacity-10'}>
                                    <Form.Group as={Row}>
                                        <Col sm={5}>
                                            <Form.Label>Contracted Service Provider</Form.Label>
                                            <Field name="service"
                                                   as={Form.Select}
                                                   required
                                            >
                                                <option hidden value=''>Choose a Service Provider</option>
                                                {options.map(
                                                    o => <option key={o}>{o}</option>
                                                )}
                                            </Field>
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Label>FTE</Form.Label>
                                            <InputGroup>
                                                <Field as={"input"}
                                                       className={"form-control"}
                                                       name="fte"
                                                       placeholder={0}
                                                       type="number"/>
                                                <InputGroup.Text>%</InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                        <Col sm={2} className={'offset-sm-1'}>
                                            <Form.Label>FY22 Actual</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Field as={"input"}
                                                       className={"form-control"}
                                                       name="actual"
                                                       placeholder={0}
                                                       type="number"/>
                                            </InputGroup>
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Label>FY23 Budget</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Field as={"input"}
                                                       className={"form-control"}
                                                       name="budget"
                                                       placeholder={0}
                                                       type="number"/>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>
                                </Card.Body>
                                <Card.Footer>
                                    <Button type={"submit"}>Add</Button>
                                </Card.Footer>
                            </Card>
                        </Form>
                        <RateApplicationTable columns={cols} data={data}/>
                    </>
                )}
        </Formik>
    );
}
export default ContractedServiceProviders