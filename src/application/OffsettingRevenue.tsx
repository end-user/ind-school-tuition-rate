import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import React from "react";
import {Field, Formik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle, faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import RateApplicationTable from "../shared/RateApplicationTable";
import {currencyFormatter} from "../services/formatter.js";
import {createColumnHelper} from "@tanstack/react-table";
import {Revenue} from "../../target/generated-sources/ts-model-data.js";
import {Tooltip} from "react-tippy";
import type {LedgerEntry} from "./model/data.d.ts"
const OffsettingRevenue = ({data, setData}: {
    data: any[],
    setData: React.Dispatch<React.SetStateAction<any[]>>
}) => {
    const columnHelper = createColumnHelper<Revenue>()
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
        revenueSource: string
    }
    const initialValues: Values = {revenueSource: '', actual: 0, budget: 0}

    const cols =
        [
            columnHelper.accessor(row => row.revenueSource, {
                id: 'revenueSource',
                header: 'Revenue Source',
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
                                <Card.Body className={'bg-info text-dark bg-opacity-10'}>
                                    <Form.Group as={Row}>
                                        <Col sm={4}>
                                            <Form.Label>Revenue</Form.Label>
                                            <Tooltip
                                                position="right"
                                                trigger="click"
                                                html={(
                                                    <div className="col-8 card border-dark">
                                                        <div className={'card-body'}>
                                                            <p>Only the following revenues may be deducted from the
                                                                expenses:</p>
                                                            <ul>
                                                                <li>Medicaid</li>
                                                                <li>Unencumbered Private Donation</li>
                                                                <li>Transportation reimbursement</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}
                                            > <FontAwesomeIcon icon={faQuestionCircle} className="text-success"/>
                                            </Tooltip>
                                            <Field name="revenueSource"
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
                                        </Col>
                                        <Col sm={2} className={'offset-sm-4'}>
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
export default OffsettingRevenue