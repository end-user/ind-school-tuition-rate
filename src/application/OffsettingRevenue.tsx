import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Field, Formik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle, faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import RateApplicationTable from "../shared/RateApplicationTable";
import {currencyFormatter} from "../services/formatter.js";
import {createColumnHelper} from "@tanstack/react-table";
import {Revenue} from "../shared/ts-model-data.ts";
import {Tooltip} from "react-tippy";
import type {LedgerEntry} from "./model/data.d.ts"
import FY from "../shared/FY.tsx";

const OffsettingRevenue = ({fy, data, setData}: {
    fy: FY,
    data: Revenue[],
    setData: React.Dispatch<React.SetStateAction<Revenue[]>>
}) => {
    const initOptions: string[] = [
        'Medicaid',//s
        'Free & Reduced Lunch Program',//s
        'Encumbered Donation',//m
        'Unencumbered Private Donation',//m
        'ESY Services',//s
        'Transportation reimbursement from LEAs',//s
        'Bank loan',//m
        'Grant',//m
        'COVID Extended Support Funding',//s
        'Title Funding Title IA, Title II or Title IV',//m
        'Payroll loan',//m
    ]
    const [revenueOptions, setRevenueOptions] = useState<string[]>([])
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
        if (values.revenueSource === "Other") return
        setRevenueOptions(revenueOptions.filter(o => o !== values.revenueSource))
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
                header: `FY${fy.this()} Actual`,
                cell: value => currencyFormatter.format(value.getValue() || 0)
            }),
            columnHelper.accessor(row => row.budget, {
                id: 'budget',
                header: `FY${fy.next()} Budget`,
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
    useEffect(() => {
        const usedOptions: (string | undefined)[] = data.map(b => {
            if (b.revenueSource !== "Other") return b.revenueSource
        })
        // const filteredOptions=
        setRevenueOptions(initOptions.filter(o => {
            if (!usedOptions.includes(o)) return o
        }))
    }, [data]);

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
                                                {revenueOptions.map(o => <option key={o}>{o}</option>)}
                                            </Field>
                                        </Col>
                                        <Col sm={2} className={'offset-sm-4'}>
                                            <Form.Label>FY{fy.this()} Actual</Form.Label>
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
                                            <Form.Label>FY{fy.next()} Budget</Form.Label>
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