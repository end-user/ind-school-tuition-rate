import {Card, Form, InputGroup} from "react-bootstrap";
import Select, {components, GroupHeadingProps} from "react-select";
import {ExpenseOption, groupedExpenseOptions, } from './model/data.ts';
import React from "react";
import Table from "react-bootstrap/Table";
import {Field, Formik} from "formik";

const GroupHeading = (
    props: GroupHeadingProps<ExpenseOption>
) => (
    <div>
        <components.GroupHeading {...props} />
    </div>
);


// if this were TS, could use the types <ColourOption | FlavourOption> in <Select>
const StaffSalaries = () => {
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
                                    <Form.Label>Benefit</Form.Label>
                                    <Select
                                        defaultValue={groupedExpenseOptions[0].options[0]}
                                        options={groupedExpenseOptions}
                                        components={{GroupHeading}}
                                        styles={{
                                            groupHeading: (base) => ({
                                                ...base,
                                                margin: 0,
                                            }),
                                        }}
                                    />
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
                                <th>Benefit</th>
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