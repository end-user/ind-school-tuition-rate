import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import SelectDropdownWithOptionGroups from "./components/SelectDropdownWithOptionGroups"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import {Field, Formik} from "formik";
import RateApplicationTable from "../shared/RateApplicationTable";
import {currencyFormatter} from "../services/formatter.js";
import {createColumnHelper} from "@tanstack/react-table";
import {AllowableExpense} from "../../target/generated-sources/ts-model-data.ts";
import {OptionsWithGroup} from "./model/data.ts"
import React from "react";


const groupedExpenseOptions: OptionsWithGroup[] = [
    {text: 'Staff mileage reimbursements (must be transporting students)', optionGroup: "Travel"},
    {text: 'Student transportation to and from School', optionGroup: "Travel"},
    {text: 'School bus/van annual repairs & maintenance', optionGroup: "Travel"},
    {text: 'School bus/van annual inspection, gasoline & oil', optionGroup: "Travel"},

    {text: 'Student Educational Supplies', optionGroup: "Supplies"},
    {text: 'Curriculum Materials', optionGroup: "Supplies"},
    {text: 'Special Education Supplies', optionGroup: "Supplies"},
    {text: 'Household supplies', optionGroup: "Supplies"},
    {text: 'Student Breakfast/lunch supplies', optionGroup: "Supplies"},
    {text: 'Art/music/electives', optionGroup: "Supplies"},
    {text: 'Physical Education Supplies', optionGroup: "Supplies"},
    {text: 'Community Based Academic Supplies', optionGroup: "Supplies"},

    {text: 'Laptop replacements', optionGroup: "Equipment"},
    {text: 'iPad replacements', optionGroup: "Equipment"},
    {text: 'Auxiliary Computer Supplies Replacement', optionGroup: "Equipment"},
    {text: 'New Technology Purchases', optionGroup: "Equipment"},
    {text: 'Required Clinical Support Services Equipment', optionGroup: "Equipment"},

    {text: 'Bldg. Insurance', optionGroup: "Operational Costs"},
    {text: 'Bldg. Depreciation', optionGroup: "Operational Costs"},
    {text: 'Bldg. Improvements', optionGroup: "Operational Costs"},
    {text: 'Bldg. Repairs', optionGroup: "Operational Costs"},
    {text: 'Maintenance, General (cannot include FTE%)', optionGroup: "Operational Costs"},
    {text: 'Maintenance, Specific (cannot include FTE%)', optionGroup: "Operational Costs"},
    {text: 'Staff Recruitment', optionGroup: "Operational Costs"},
    {text: 'Postage', optionGroup: "Operational Costs"},
    {text: 'Snow Removal', optionGroup: "Operational Costs"},
    {text: 'Rubbish/Recycling', optionGroup: "Operational Costs"},
    {text: 'Administration Fees', optionGroup: "Operational Costs"},
    {text: 'Agency Fees', optionGroup: "Operational Costs"},
    {text: 'Utilities', optionGroup: "Operational Costs"},
    {text: 'Business Cell Phone(only)', optionGroup: "Operational Costs"},
    {text: 'Internet', optionGroup: "Operational Costs"},
    {text: 'Landline', optionGroup: "Operational Costs"},
    {text: 'Rent (school facilities only)', optionGroup: "Operational Costs"},
    {text: 'Mortgage', optionGroup: "Operational Costs"},
    {text: 'Property Taxes', optionGroup: "Operational Costs"},
    {text: 'Property Liability Insurance', optionGroup: "Operational Costs"},

];

// if this were TS, could use the types <ColourOption | FlavourOption> in <Select>
const AllowableExpenses = ({data, setData}: {
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
    const addRow = async (values: any[]) => {
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
                initialValues={[{'expense': '', 'actual': 0, 'budget': 0}]}
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
                                            <Form.Label>FY22 Actual</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Field as={"input"}
                                                       className={"form-control"}
                                                       name="actual"
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