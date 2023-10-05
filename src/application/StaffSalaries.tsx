import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import React from "react";
import {Field, FieldProps, Formik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import RateApplicationTable from "../shared/RateApplicationTable";
import {currencyFormatter} from "../services/formatter.js";
import {createColumnHelper} from "@tanstack/react-table";
import {StaffSalary} from "../shared/ts-model-data.ts";
import FY from "../shared/FY.tsx";
import {number, object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const validationSchema = object()
    .shape({
        positionTitle: string().required(),
        status: string().required(),
        genEdu: number().required().min(0).max(100, "${path} cannot be greater than 100")
            .test(
                "sum",
                "The sum of genEdu and speEdu cannot exceed 100.",
                (value, context) => {
                    const {speEdu} = context.parent;
                    return speEdu + value <= 100;
                }
            )
        ,
        speEdu: number().required().min(0).max(100, "${path} cannot be greater than 100")
            .test(
                "sum",
                "The sum of genEdu and speEdu cannot exceed 100.",
                (value, context) => {
                    const {genEdu} = context.parent;
                    return genEdu + value <= 100;
                }
            ),
        actual: number().required(),
        budget: number()
    });
yupResolver(validationSchema)
/*const {
    formState: {errors},
    register,
    handleSubmit
} = useForm({
    resolver: yupResolver(validationSchema),
});*/

const StaffSalaries = ({fy, data, setData}: {
    fy: FY,
    data: StaffSalary[],
    setData: React.Dispatch<React.SetStateAction<StaffSalary[]>>
}) => {
    const columnHelper = createColumnHelper<StaffSalary>()
    const deleteRow = async (id: number) => {
        //todo this will be a call to the server
        console.log(`delete table row ${id}`)
        const tmpData = [...data]
        tmpData.splice(id, 1)
        setData(tmpData)
    }
    const addRow = async (values: StaffSalary) => {
        console.log("fired submit")
        const tmpData = [...data]
        tmpData.push(values)
        setData(tmpData)
    };

    const initialValues: StaffSalary = {
        positionTitle: '',
        status: '',
        genEdu: 100,
        speEdu: 0,
        actual: 0,
        budget: 0
    }
    const cols =
        [
            columnHelper.accessor(row => row.positionTitle, {
                // cell: info => <i>{info.getValue()}</i>,
                header: 'Position/Title',
                // footer: info => info.column.id,
            }),
            columnHelper.accessor(row => row.status, {
                header: 'Status',
            }),
            columnHelper.accessor(row => row.speEdu, {
                header: 'SpeEdu (%)',
            }),
            columnHelper.accessor(row => row.genEdu, {
                header: 'GenEd (%)',
            }),
            columnHelper.accessor(row => row.actual, {
                header: `FY${fy.this()} Actual`,
                cell: value => currencyFormatter.format(value.getValue() || 0)
            }),
            columnHelper.accessor(row => row.budget, {
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

//todo: If status == vacant only allow budget value
    return (
        <Formik enableReinitialize
                onSubmit={addRow}
                initialValues={initialValues}
                validationSchema={validationSchema}

        >
            {
                ({
                     handleSubmit,
                     errors,
                     touched
                 }) => (
                    <>
                        <Form noValidate onSubmit={handleSubmit}>
                            <Card>
                                <Card.Header>Rule 2232 (1)(A)</Card.Header>
                                <Card.Body className={'bg-info text-dark bg-opacity-10'}>
                                    <Form.Group as={Row}>
                                        <Col sm={3}>
                                            <Form.Label>Position/Title</Form.Label>
                                            <Field name="positionTitle"
                                                   required
                                            >
                                                {({field}: FieldProps) => (
                                                    <Form.Select
                                                        isInvalid={!!(touched.positionTitle && errors.positionTitle)}
                                                        {...field}
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
                                                    </Form.Select>
                                                )}
                                            </Field>
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Label>Status</Form.Label>
                                            <Field name="status"
                                                   required
                                            >
                                                {({field}: FieldProps) => (
                                                    <Form.Select
                                                        isInvalid={!!(touched.status && errors.status)}
                                                        {...field}
                                                    >
                                                        <option hidden value=''>Choose a Status</option>
                                                        <option>filled</option>
                                                        <option>vacant</option>
                                                    </Form.Select>
                                                )}
                                            </Field>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Col sm={2}>
                                            <Form.Label>SpeEdu</Form.Label>
                                            <InputGroup hasValidation>
                                                <Field name="speEdu">
                                                    {({field}: FieldProps) => (
                                                        <Form.Control
                                                            type="number"
                                                            isInvalid={!!(touched.speEdu && errors.speEdu)}
                                                            {...field}
                                                        />
                                                    )}
                                                </Field>
                                                <InputGroup.Text>%</InputGroup.Text>
                                                <Form.Control.Feedback type={"invalid"}>
                                                    {errors.speEdu}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Label>GenEd</Form.Label>
                                            <InputGroup hasValidation>
                                                <Field name="genEdu">
                                                    {({field}: FieldProps) => (
                                                        <Form.Control
                                                            type="number"
                                                            isInvalid={!!(touched.genEdu && errors.genEdu)}
                                                            {...field}
                                                        />
                                                    )}
                                                </Field>
                                                <InputGroup.Text>%</InputGroup.Text>
                                                <Form.Control.Feedback type={"invalid"}>
                                                    {errors.genEdu}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Col sm={2}>
                                            <Form.Label>FY{fy.this()} Actual</Form.Label>
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
                                        <Col sm={2}>
                                            <Form.Label>FY{fy.next()} Budget</Form.Label>
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