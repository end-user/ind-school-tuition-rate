import {Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import {Field, Formik} from "formik";
import {currencyFormatter} from "../services/formatter.js";
import FY from "../shared/FY.tsx";
import {NetProgramCosts, SchoolHead} from "../shared/ts-model-data.ts";
import React from "react";

const ApplicantInfo = ({fy, enrollment, schoolHead, netCosts, setNetCosts}: {
    fy: FY,
    enrollment: number,
    schoolHead: SchoolHead | undefined,
    netCosts: NetProgramCosts,
    setNetCosts: React.Dispatch<React.SetStateAction<NetProgramCosts>>
}) => {
    const initialValues = {
        ...{
            enrollment: enrollment,
            salaryActuals: 0,
            salaryNet: 0,
            benefitActuals: 0,
            benefitNet: 0,
            expenseActuals: 0,
            expenseNet: 0,
            serviceActuals: 0,
            serviceNet: 0,
            revenueActuals: 0,
            revenueNet: 0
        }, ...netCosts
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        console.log(`msg from ${name}, needs to set ${value}`)
        setNetCosts({...netCosts, [name]: value});
    }

    return (
        <Formik enableReinitialize
                onSubmit={()=>{}}
                initialValues={initialValues}
        >
            {({
                  values,
              }) => (<>
                    <Form>
                        <div className={"row"}>

                            <div className={"col-4"}>
                                <Card>
                                    <Card.Header>Rule 2232 (2)</Card.Header>
                                    <Card.Body>
                                        <p>{schoolHead?.name}</p>
                                        <span>{schoolHead?.schoolProfile?.name}</span>
                                        <span> (grades {schoolHead?.schoolProfile?.gradeRange})</span>
                                        <address>
                                            {schoolHead?.schoolProfile?.address}<br/>
                                            {schoolHead?.schoolProfile?.cityStateZip}
                                        </address>
                                        <Form.Group as={Row}>
                                            <Form.Label column={true}>current enrolled students</Form.Label>
                                            <Col sm={5}><Field as={"input"}
                                                               className={"form-control"}
                                                               name="enrollment"
                                                               type="number"
                                                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                                               required
                                            /></Col>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className={"col-8"}>
                                <Card>
                                    <Card.Header>FY{fy.next()} Tuition Rate - Net Program Costs</Card.Header>
                                    <Card.Body>
                                        <Form.Group as={Row}>
                                            <Col className={'offset-5 col-3'}>
                                                <Form.Label>FY{fy.this()} Actuals</Form.Label>
                                            </Col>
                                            <Col className={'col-3'}>
                                                <Form.Label>FY{fy.next()} Net Program Costs</Form.Label>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Col className={'col-5'}>
                                                <Form.Label>Salary Costs</Form.Label>
                                            </Col>
                                            <Col className={'col-3'}>
                                                <InputGroup>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                    <Field as={"input"}
                                                           className={"form-control"}
                                                           name="salaryActuals"
                                                           type="number"
                                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                                           required
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col className={'col-3'}>
                                                <InputGroup>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                    <Field as={"input"}
                                                           className={"form-control"}
                                                           name="salaryNet"
                                                           type="number"
                                                           required
                                                    />
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Col className={'col-5'}>
                                                <Form.Label>Benefits Costs</Form.Label>
                                            </Col>
                                            <Col className={'col-3'}>
                                                <InputGroup>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                    <Field as={"input"}
                                                           className={"form-control"}
                                                           name="benefitActuals"
                                                           type="number"
                                                           required
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col className={'col-3'}>
                                                <InputGroup>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                    <Field as={"input"}
                                                           className={"form-control"}
                                                           name="benefitNet"
                                                           type="number"
                                                           required
                                                    />
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Col className={'col-5'}>
                                                <Form.Label>Allowable Expenses</Form.Label>
                                            </Col>
                                            <Col className={'col-3'}>
                                                <InputGroup>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                    <Field as={"input"}
                                                           className={"form-control"}
                                                           name="expenseActuals"
                                                           type="number"
                                                           required
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col className={'col-3'}>
                                                <InputGroup>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                    <Field as={"input"}
                                                           className={"form-control"}
                                                           name="expenseNet"
                                                           type="number"
                                                           required
                                                    />
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Col className={'col-5'}>
                                                <Form.Label>Contracted Services</Form.Label>
                                            </Col>
                                            <Col className={'col-3'}>
                                                <InputGroup>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                    <Field as={"input"}
                                                           className={"form-control"}
                                                           name="serviceActuals"
                                                           type="number"
                                                           required
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col className={'col-3'}>
                                                <InputGroup>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                    <Field as={"input"}
                                                           className={"form-control"}
                                                           name="serviceNet"
                                                           type="number"
                                                           required
                                                    />
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Col className={'col-5'}>
                                                <Form.Label>Off-setting Revenue</Form.Label>
                                            </Col>
                                            <Col className={'col-3'}>
                                                <InputGroup>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                    <Field as={"input"}
                                                           className={"form-control"}
                                                           name="revenueActuals"
                                                           type="number"
                                                           required
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col className={'col-3'}>
                                                <InputGroup>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                    <Field as={"input"}
                                                           className={"form-control"}
                                                           name="revenueNet"
                                                           type="number"
                                                           required
                                                    />
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                        <div className={"row"}>
                                            <div className={"offset-sm-5 col-3"}>
                                                <div
                                                    className={"bg-info bg-opacity-10 border rounded text-end p-2 my-2"}>
                                                    {currencyFormatter.format(
                                                        values.salaryActuals + values.benefitActuals + values.expenseActuals
                                                        + values.serviceActuals - values.revenueActuals
                                                    )}
                                                </div>
                                            </div>
                                            <div className={"col-3"}>
                                                <div
                                                    className={"bg-info bg-opacity-10 border rounded text-end p-2 my-2"}>
                                                    {currencyFormatter.format(
                                                        values.salaryNet + values.benefitNet + values.expenseNet
                                                        + values.serviceNet - values.revenueNet
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </Form>
                </>
            )}
        </Formik>
    );
}

export default ApplicantInfo