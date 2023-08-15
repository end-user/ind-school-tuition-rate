import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import {Field, Formik} from "formik";
import RateApplicationTable from "../shared/RateApplicationTable";
import {currencyFormatter} from "../services/formatter.js";
import {createColumnHelper} from "@tanstack/react-table";
import {ContractedService} from "../../target/generated-sources/ts-model-data.js";
import type {LedgerEntry} from "./model/data.d.ts"
const ContractedServiceProviders = ({data, setData}: {
    data: any[],
    setData: React.Dispatch<React.SetStateAction<any[]>>
}) => {
    const columnHelper = createColumnHelper<ContractedService>()
    const deleteRow = async (id: number) => {
        //todo this will be a call to the server
        console.log(`delete table row ${id}`)
        const tmpData = [...data]
        tmpData.splice(id, 1)
        setData(tmpData)
    }
    const addRow = async (values: Values) => {
        const tmpData = [...data]
        tmpData.push(values)
        setData(tmpData)
    };
    type Values = LedgerEntry & {
        service: string
    }
    const initialValues: Values = {service: '', actual: 0, budget: 0}

    const serviceOptions: string[] = [
        'Physical Therapist',
        'Occupational Therapist',
        'Speech Language Pathologist',
        'Clinical Provider',
        'Payroll Specialist',
        'IT support contract',
        'Janitorial Services, snow plowing and trash/recycling removal',
        'Nurse/Medical Provider',
    ]

    const cols =
        [
            columnHelper.accessor(row => row.service, {
                id: 'service',
                header: 'Service',
            }),
            columnHelper.accessor(row => row.actual, {
                id: 'actual',
                header: 'FY22 Actual',
                cell: value => currencyFormatter.format(value.getValue() || 0)
            }),
            columnHelper.accessor(row => row.budget, {
                id: 'budget',
                header: 'FY23 Budget',
                cell: value => currencyFormatter.format(value.getValue() || 0)
            }),
            columnHelper.display({
                id: 'delete',
                cell: (tableProps) => (
                    <Button variant={'link'} className={'text-success'} onClick={() => deleteRow(tableProps.row.index)}>
                        <FontAwesomeIcon icon={faSquareXmark}/>
                    </Button>
                ),
            })
        ]

    return (
        <Formik enableReinitialize
                onSubmit={addRow}
                initialValues={initialValues}
        >
            {
                ({
                     handleSubmit,
                 }) => (
                    <>
                        <Form onSubmit={handleSubmit}>
                            <Card>
                                <Card.Header>Rule 2232 (1) (B)(C)</Card.Header>
                                <Card.Body className={'bg-info text-dark bg-opacity-10'}>
                                    <Form.Group as={Row}>
                                        <Col sm={5}>
                                            <Form.Label>Contracted Service Provider</Form.Label>
                                            <Field name="service"
                                                   as={Form.Select}
                                                   required
                                            >
                                                <option hidden value=''>Choose a Service Provider</option>
                                                {serviceOptions.map(
                                                    o => <option key={o}>{o}</option>
                                                )}
                                            </Field>
                                        </Col>
                                        {/* <Col sm={2}>
                                            <Form.Label>FTE</Form.Label>
                                            <InputGroup>
                                                <Field as={"input"}
                                                       className={"form-control"}
                                                       name="fte"
                                                       placeholder={0}
                                                       type="number"/>
                                                <InputGroup.Text>%</InputGroup.Text>
                                            </InputGroup>
                                        </Col>*/}
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