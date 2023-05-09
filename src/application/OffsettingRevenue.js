import {Button, Card, Col, Form, InputGroup} from "react-bootstrap";
import React from "react";
import {Field, Formik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import RateApplicationTable from "./components/RateApplicationTable";
import {currencyFormatter} from "../services/formatter";

const OffsettingRevenue = ({data, setData}) => {
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

    const cols =
        [
            {
                Header: 'Revenue',
                accessor: 'revenue', // accessor is the "key" in the data
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
                <Button onClick={() => deleteRow(tableProps.row.index)}>
                    <FontAwesomeIcon icon={faXmark}/>
                </Button>
            ),
        },
        ]


    return (
        <Formik enableReinitialize
                onSubmit={addRow}
                initialValues={{'revenue': '', 'actual': 0, 'budget': 0}}
        >
            {
                ({
                     handleSubmit,
                 }) => (
                    <>
                        <Form onSubmit={handleSubmit}>
                            <Card>
                                <Card.Body className={'bg-info text-dark bg-opacity-10'}>
                                    <Form.Group>
                                        <Form.Label>Revenue</Form.Label>
                                        <Field name="revenue"
                                               as={Form.Select}
                                               required
                                        >
                                            <option hidden value=''>Choose a Revenue</option>
                                            <option>Medicaid</option>
                                            <option>Free & Reduced Lunch Program</option>
                                            <option>Encumbered Donation</option>
                                            <option>Unencumbered Private Donation</option>
                                            <option>ESY Services</option>
                                            <option>Transportation reimbursement from LEAs</option>
                                            <option>Bank loan</option>
                                            <option>Grant</option>
                                            <option>COVID Extended Support Funding</option>
                                            <option>Title Funding Title IA, Title II or Title IV</option>
                                            <option>Payroll loan</option>
                                        </Field>
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
                            <RateApplicationTable columns={cols} data={data}/>
                        </Form></>)}</Formik>
    );
}
export default OffsettingRevenue