import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import SelectDropdownWithOptionGroups from "./components/SelectDropdownWithOptionGroups"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import {Field, Formik} from "formik";
import RateApplicationTable from "../shared/RateApplicationTable";
import {currencyFormatter} from "../services/formatter.js";
import {createColumnHelper} from "@tanstack/react-table";
import {AllowableExpense} from "../shared/ts-model-data.ts";
import type {LedgerEntry, OptionsWithGroup} from "./model/data.d.ts"
import React from "react";
import FY from "../shared/FY.tsx";


const groupLabel: {
    [key: string]: string
} = {
    'travel': "Travel - Rule 2232 (1) (F)",
    'supplies': "Supplies - Rule 2232 (1) (E)",
    'equipment': "Equipment - Rule 2232 (1) (E)",
    'operational': "Operational Costs - Rule 2232 (1) (D)(G)(H)(I)(J)"
}
const groupedExpenseOptions: OptionsWithGroup[] = [
    {text: 'Staff mileage reimbursements (must be transporting students)', optionGroup: groupLabel['travel']},
    {text: 'Student transportation to and from School', optionGroup: groupLabel['travel']},
    {text: 'School bus/van annual repairs & maintenance', optionGroup: groupLabel['travel']},
    {text: 'School bus/van annual inspection, gasoline & oil', optionGroup: groupLabel['travel']},

    {text: 'Student Educational Supplies', optionGroup: groupLabel['supplies']},
    {text: 'Curriculum Materials', optionGroup: groupLabel['supplies']},
    {text: 'Special Education Supplies', optionGroup: groupLabel['supplies']},
    {text: 'Household supplies', optionGroup: groupLabel['supplies']},
    {text: 'Student Breakfast/lunch supplies', optionGroup: groupLabel['supplies']},
    {text: 'Art/music/electives', optionGroup: groupLabel['supplies']},
    {text: 'Physical Education Supplies', optionGroup: groupLabel['supplies']},
    {text: 'Community Based Academic Supplies', optionGroup: groupLabel['supplies']},

    {text: 'Laptop replacements', optionGroup: groupLabel['equipment']},
    {text: 'iPad replacements', optionGroup: groupLabel['equipment']},
    {text: 'Auxiliary Computer Supplies Replacement', optionGroup: groupLabel['equipment']},
    {text: 'New Technology Purchases', optionGroup: groupLabel['equipment']},
    {text: 'Required Clinical Support Services Equipment', optionGroup: groupLabel['equipment']},

    {text: 'Bldg. Insurance', optionGroup: groupLabel['operational']},
    {text: 'Bldg. Depreciation', optionGroup: groupLabel['operational']},
    {text: 'Bldg. Improvements', optionGroup: groupLabel['operational']},
    {text: 'Bldg. Repairs', optionGroup: groupLabel['operational']},
    {text: 'Maintenance, General (cannot include FTE%)', optionGroup: groupLabel['operational']},
    {text: 'Maintenance, Specific (cannot include FTE%)', optionGroup: groupLabel['operational']},
    {text: 'Staff Recruitment', optionGroup: groupLabel['operational']},
    {text: 'Postage', optionGroup: groupLabel['operational']},
    {text: 'Snow Removal', optionGroup: groupLabel['operational']},
    {text: 'Rubbish/Recycling', optionGroup: groupLabel['operational']},
    {text: 'Administration Fees', optionGroup: groupLabel['operational']},
    {text: 'Agency Fees', optionGroup: groupLabel['operational']},
    {text: 'Utilities', optionGroup: groupLabel['operational']},
    {text: 'Business Cell Phone(only)', optionGroup: groupLabel['operational']},
    {text: 'Internet', optionGroup: groupLabel['operational']},
    {text: 'Landline', optionGroup: groupLabel['operational']},
    {text: 'Rent (school facilities only)', optionGroup: groupLabel['operational']},
    {text: 'Mortgage', optionGroup: groupLabel['operational']},
    {text: 'Property Taxes', optionGroup: groupLabel['operational']},
    {text: 'Property Liability Insurance', optionGroup: groupLabel['operational']},

];

// if this were TS, could use the types <ColourOption | FlavourOption> in <Select>
const AllowableExpenses = ({fy,data, setData}: {
    fy:FY,
    data: any[],
    setData: React.Dispatch<React.SetStateAction<any[]>>
}) => {
    const columnHelper = createColumnHelper<AllowableExpense>()
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


    const cols =
        [
            columnHelper.accessor(row => row.expense, {
                id: 'expense',
                header: 'Expense',
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
    type Values = LedgerEntry & {
        expense: string
    }
    const initialValues: Values = {expense: '', actual: 0, budget: 0}
    return (
        <Formik enableReinitialize
                onSubmit={addRow}
                initialValues={initialValues}
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
                                            <Form.Label>Expense</Form.Label>
                                            <SelectDropdownWithOptionGroups options={groupedExpenseOptions}
                                                                            name={"expense"}
                                                                            handleChange={handleChange}
                                            />
                                        </Col>
                                        <Col sm={2} className={'offset-sm-3'}>
                                            <Form.Label>FY{fy.this()} Actual</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Field as={"input"}
                                                       className={"form-control"}
                                                       name="actual"
                                                       type="number"/>
                                            </InputGroup>
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Label>FY{fy.next()} Budget</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Field as={"input"}
                                                       className={"form-control"}
                                                       name="budget"
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
export default AllowableExpenses