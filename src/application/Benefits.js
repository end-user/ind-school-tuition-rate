import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import React from "react";
import {Field, Formik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import RateApplicationTable from "./components/RateApplicationTable";
import {currencyFormatter} from "../services/formatter";

const Benefits = ({data, setData}) => {
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

    const cols = [{
        Header: 'Benefit', accessor: 'benefit', // accessor is the "key" in the data
    }, {
        Header: 'FY22 Actual', accessor: 'actual', Cell: ({value}) => currencyFormatter.format(value)
    }, {
        Header: 'FY23 Budget', accessor: 'budget', Cell: ({value}) => currencyFormatter.format(value)
    }, {
        Header: '',
        id: 'delete',
        accessor: 'delete',
        Cell: (tableProps) => (<Button onClick={() => deleteRow(tableProps.row.index)}>
            <FontAwesomeIcon icon={faXmark}/>
        </Button>),
    },]

    return (<Formik enableReinitialize
                    onSubmit={addRow}
                    initialValues={{'benefit': '', 'actual': 0, 'budget': 0}}
        >
            {({
                  handleSubmit,
              }) => (<>
                    <Form onSubmit={handleSubmit}>
                        <Card>
                            <Card.Body className={'bg-info text-dark bg-opacity-10'}>
                                <Form.Group as={Row}>
                                    <Col sm={3}>
                                        <Form.Label>Benefit</Form.Label>
                                        <Field name="benefit"
                                               as={Form.Select}
                                               required
                                        >
                                            <option hidden value=''>Choose a Benefit</option>
                                            <option>FICA</option>
                                            <option>Workers' Compensation</option>
                                            <option>Unemployment</option>
                                            <option>Group Health/Dental Insurance</option>
                                            <option>Group Life Insurance</option>
                                            <option>Disability Insurance</option>
                                            <option>Pension</option>
                                            <option>Profits Sharing</option>
                                            <option>Tuition</option>
                                            <option>Employee Gifts/Awards/Banquets</option>
                                            <option>Other (please list below)</option>
                                        </Field>
                                    </Col>
                                    <Col sm={2} className={'offset-sm-5'}>
                                        <Form.Label>FY22 Actual</Form.Label>
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
                                    <Col sm={2}>
                                        <Form.Label>FY23 Budget</Form.Label>
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
                        <RateApplicationTable columns={cols} data={data}/>
                    </Form>
                </>
            )}
        </Formik>
    );
}
export default Benefits