import {Card, Form, InputGroup} from "react-bootstrap";
import SelectDropdownWithOptionGroups from "./SelectDropdownWithOptionGroups"
import Select, {components, GroupHeadingProps} from "react-select";
import {ExpenseOption, } from './model/data.ts';
import React from "react";
import Table from "react-bootstrap/Table";
import {Field, Formik} from "formik";


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
    {text: 'Janitorial Services, snow plowing and trash/recycling removal', optionGroup: "Contracted Service Providers"},
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
const StaffSalaries = () => {

    const renderOptions = options => {
        return options.map(option => {
            return (
                <option key={option.value} value={option.value}>
                    {option.text}
                </option>
            );
        });
    };


    return (
        <Formik
            onSubmit={async (values) => {
                console.log("form would have submitted here.", values)
            }}
            initialValues={{'category': 'staff', 'lastName': 'trial.'}}
        >
            {
                ({

                     initialValues,
                     values,
                     handleChange,
                     errors,
                     dirty,
                     isValid,
                     isSubmitting,
                     handleSubmit,
                     setFieldValue,
                     setFieldTouched,
                     setFieldError
                 }) => (
                    <>
                        <Card>
                            <Card.Body className={'bg-info text-dark bg-opacity-10'}>
                                <Form.Group>
                                    <Form.Label>Expense</Form.Label>
                                    <SelectDropdownWithOptionGroups options={groupedExpenseOptions}
                                                                    name={"test"}
                                                                    value={"test"}
                                                                    onChange={()=>{}}
                                                                    />
                                    {/*<Select
                                        defaultValue={groupedExpenseOptions[0].options[0]}
                                        options={groupedExpenseOptions}
                                        components={{GroupHeading}}
                                        styles={{
                                            groupHeading: (base) => ({
                                                ...base,
                                                margin: 0,
                                            }),
                                        }}
                                    />*/}
                                    <Form.Label>FY22 Actual</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Field as={"input"}
                                               className={"form-control"}
                                               name="actual"
                                               type="number"/>
                                    </InputGroup>
                                    <Form.Label>FY23 Budget</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Field as={"input"}
                                               className={"form-control"}
                                               name="budget"
                                               type="number"/>
                                    </InputGroup>
                                </Form.Group>
                            </Card.Body>
                        </Card>

                        <Table className={"mt-5 pt-5"}>
                            <thead>
                            <tr>
                                <th>Expense</th>
                                <th>FY22 Actual</th>
                                <th>FY23 Budget</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>FICA</td>
                                <td>$ 9,381</td>
                                <td>$ 10,000</td>
                            </tr>
                            </tbody>
                        </Table>
                    </>
                )
            }
        </Formik>);
}
export default StaffSalaries