import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import React from "react";
import {Field, Formik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import RateApplicationTable from "../shared/RateApplicationTable";
import {currencyFormatter} from "../services/formatter.js";
import {createColumnHelper} from "@tanstack/react-table";
import {StaffSalary} from "../../target/generated-sources/ts-model-data.js";

const StaffSalaries = ({data, setData}: {
    data: any[],
    setData: React.Dispatch<React.SetStateAction<any[]>>
}) => {
    const columnHelper = createColumnHelper<StaffSalary>()
    const deleteRow = async (id: number) => {
        //todo this will be a call to the server
        console.log(`delete table row ${id}`)
        const tmpData = [...data]
        tmpData.splice(id, 1)
        setData(tmpData)
    }
    const addRow = async (values: any[]) => {
        const tmpData = [...data]
        tmpData.push(values)
        setData(tmpData)
    };

    const cols =
        [
            columnHelper.accessor(row => row.positionTitle, {
                id: 'positionTitle',
                // cell: info => <i>{info.getValue()}</i>,
                header: 'Position/Title',
                // footer: info => info.column.id,
            }),
            columnHelper.accessor(row => row.status, {
                id: 'status',
                header: 'Status',
            }),
            columnHelper.accessor(row => row.fte, {
                id: 'fte',
                header: 'FTE',
            }),
            columnHelper.accessor(row => row.speEdu, {
                id: 'speEdu',
                header: 'SpeEdu (%)',
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

//todo: If status == vacant only allow budget value
    return (
        <Formik enableReinitialize
                onSubmit={addRow}
                initialValues={[{
                    'staffCategory': '',
                    'status': '',
                    'fte': 100,
                    'speEdu': 0,
                    'positionTitle': '',
                    'payRate': 0,
                    'actual': 0,
                    'budget': 0
                }]}
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
                                            <Field name="positionTitle"
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
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column={true}>Status</Form.Label>
                                        <Col>
                                            <Field name="status"
                                                   as={Form.Select}
                                                   required
                                            >
                                                <option hidden value=''>Choose a Status</option>
                                                <option>filled</option>
                                                <option>vacant</option>
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
                                            <InputGroup>
                                                <Field as={"input"}
                                                       className={"form-control"}
                                                       name="fte"
                                                       type="number"/>
                                                <InputGroup.Text>%</InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>

                                        <Form.Label column={true}>FY22 Actual</Form.Label>
                                        <Col>
                                            <InputGroup>
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Field as={"input"}
                                                       className={"form-control"}
                                                       name="actual"
                                                       placeholder={0}
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
                                                       placeholder={0}
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
                        <RateApplicationTable columns={cols} data={data}/>
                    </>
                )
            }
        </Formik>
    );
}
export default StaffSalaries