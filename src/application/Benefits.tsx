import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import React from "react";
import {Field, Formik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle, faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import RateApplicationTable from "../shared/RateApplicationTable";
import {currencyFormatter} from "../services/formatter.js";
import {Tooltip} from "react-tippy";
import {createColumnHelper} from "@tanstack/react-table";
import {Benefit} from "../shared/ts-model-data.ts";
import type {LedgerEntry} from "./model/data.d.ts"

const Benefits = ({data, setData}: {
    data: any[],
    setData: React.Dispatch<React.SetStateAction<any[]>>
}) => {
    const columnHelper = createColumnHelper<Benefit>()
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
        benefit: string
    }
    const initialValues: Values = {benefit: '', actual: 0, budget: 0}
    const benefitOptions: string[] = [
        'FICA',
        'Workers\' Compensation',
        'Unemployment',
        'Group Health/Dental Insurance',
        'Group Life Insurance',
        'Disability Insurance',
        'Staff Liability Insurance',
        'Pension',
        'Profits Sharing',
        'Staff Professional Development (for all staff members)',
        'Employee Gifts/Awards/Banquets',
    ]

    const cols = [
        columnHelper.accessor(row => row.benefit, {
            id: 'benefit',
            header: 'Benefit',
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

    return (<Formik enableReinitialize
                    onSubmit={addRow}
                    initialValues={initialValues}
        >
            {({
                  handleSubmit,
              }) => (<>
                    <Form onSubmit={handleSubmit}>
                        <Card>
                            <Card.Header>Rule 2232 (1) (K)</Card.Header>
                            <Card.Body className={'bg-info text-dark bg-opacity-10'}>
                                <Form.Group as={Row}>
                                    <Col sm={4}>
                                        <Form.Label>Benefit</Form.Label>
                                        <Tooltip
                                            position="right"
                                            trigger="click"
                                            html={(
                                                <div className="col-8 card border-dark">
                                                    <div className={'card-body'}>
                                                        <p>This is an example of some pop-up help text.</p>
                                                    </div>
                                                </div>
                                            )}
                                        > <FontAwesomeIcon icon={faQuestionCircle} className="text-success"/>
                                        </Tooltip>
                                        <Field name="benefit"
                                               as={Form.Select}
                                               required
                                        >
                                            <option hidden value=''>Choose a Benefit</option>
                                            {benefitOptions.map(
                                                o => <option key={o}>{o}</option>
                                            )}
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
export default Benefits