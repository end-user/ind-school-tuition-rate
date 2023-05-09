import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import SelectDropdownWithOptionGroups from "./components/SelectDropdownWithOptionGroups"
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {Field, Formik} from "formik";
import RateApplicationTable from "./components/RateApplicationTable";
import {currencyFormatter} from "../services/formatter";


const groupedExpenseOptions = [
    {text: 'Staff mileage reimbursements', optionGroup: "Travel"},
    {text: 'Student transportation to and from School', optionGroup: "Travel"},
    {text: 'School bus/van annual repairs & maintenance', optionGroup: "Travel"},
    {text: 'School bus/van annual inspection, gasoline & oil', optionGroup: "Travel"},
    {text: 'Student Educational Supplies', optionGroup: "Supplies"},
    {text: 'Curriculum Materials', optionGroup: "Supplies"},
    {text: 'Special Education Services', optionGroup: "Supplies"},
    {text: 'Household supplies', optionGroup: "Supplies"},
    {text: 'Student Breakfast/lunch supplies', optionGroup: "Supplies"},
    {text: 'Art/music/electives', optionGroup: "Supplies"},
    {text: 'Physical Education Supplies', optionGroup: "Supplies"},
    {text: 'Community Based Academic Supplies', optionGroup: "Supplies"},
    {text: 'Physical Therapist', optionGroup: "Contracted Service Providers"},
    {text: 'Occupational Therapist', optionGroup: "Contracted Service Providers"},
    {text: 'Speech Language Pathologist', optionGroup: "Contracted Service Providers"},
    {text: 'Clinical Provider', optionGroup: "Contracted Service Providers"},
    {text: 'Payroll Specialist', optionGroup: "Contracted Service Providers"},
    {text: 'IT support contract', optionGroup: "Contracted Service Providers"},
    {
        text: 'Janitorial Services, snow plowing and trash/recycling removal',
        optionGroup: "Contracted Service Providers"
    },
    {text: 'Nurse/Medical Provider', optionGroup: "Contracted Service Providers"},
    {text: 'Laptop replacements', optionGroup: "Equipment"},
    {text: 'iPad replacements', optionGroup: "Equipment"},
    {text: 'Auxiliary Computer Supplies Replacement', optionGroup: "Equipment"},
    {text: 'New Technology Purchases', optionGroup: "Equipment"},
    {text: 'Required Clinical Support Services Equipment', optionGroup: "Equipment"},
    {text: 'Bldg. Insurance', optionGroup: "Operational Costs"},
    {text: 'Bldg. Depreciation', optionGroup: "Operational Costs"},
    {text: 'Bldg. Improvements', optionGroup: "Operational Costs"},
    {text: 'Bldg. Repairs', optionGroup: "Operational Costs"},
    {text: 'Maintenance, General', optionGroup: "Operational Costs"},
    {text: 'Maintenance, Specific', optionGroup: "Operational Costs"},
    {text: 'Staff Recruitment', optionGroup: "Operational Costs"},
    {text: 'Postage', optionGroup: "Operational Costs"},
    {text: 'Snow Removal', optionGroup: "Operational Costs"},
    {text: 'Rubbish/Recycling', optionGroup: "Operational Costs"},
    {text: 'Administration Fees', optionGroup: "Operational Costs"},
    {text: 'Agency Fees', optionGroup: "Operational Costs"},
];


// if this were TS, could use the types <ColourOption | FlavourOption> in <Select>
const AllowableExpenses = ({data, setData}) => {
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
                Header: 'Expense',
                accessor: 'expense', // accessor is the "key" in the data
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
                initialValues={{'expense': '', 'actual': 0, 'budget': 0}}
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