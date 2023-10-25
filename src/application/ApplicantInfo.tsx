import {Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import {Field, FormikProvider, useFormik} from "formik";
import {currencyFormatter} from "../services/formatter.js";
import FY from "../shared/FY.tsx";
import {RateApplication} from "../shared/ts-model-data.ts";
import React, {useEffect} from "react";

type ApplicationHandlers = {
    rateApplication: RateApplication,
    setRateApplication: React.Dispatch<React.SetStateAction<RateApplication>>
};
const ApplicantInfo = ({fy, applicationHandler}: {
    fy: FY,
    applicationHandler: ApplicationHandlers
}) => {
    // destructure
    const {rateApplication, setRateApplication} = applicationHandler
    const {schoolHead} = rateApplication || {}
    const initialValues: RateApplication = {
        ...{
            enrollment: 0,
            netProgramCosts: {
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
            }
        }, ...rateApplication
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: v => {
            v
        },
        enableReinitialize: true
    })
    useEffect(() => {
        const updated = {
            ...rateApplication,
            ...formik.values
        }
        setRateApplication(updated)
    }, [formik.values]);
    return (
        <FormikProvider value={formik}>
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
                                                   name="netProgramCosts.salaryActuals"
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
                                                   name="netProgramCosts.salaryNet"
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
                                                   name="netProgramCosts.benefitActuals"
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
                                                   name="netProgramCosts.benefitNet"
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
                                                   name="netProgramCosts.expenseActuals"
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
                                                   name="netProgramCosts.expenseNet"
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
                                                   name="netProgramCosts.serviceActuals"
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
                                                   name="netProgramCosts.serviceNet"
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
                                                   name="netProgramCosts.revenueActuals"
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
                                                   name="netProgramCosts.revenueNet"
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
                                                (formik.values.netProgramCosts?.salaryActuals || 0)
                                                + (formik.values.netProgramCosts?.benefitActuals || 0)
                                                + (formik.values.netProgramCosts?.expenseActuals || 0)
                                                + (formik.values.netProgramCosts?.serviceActuals || 0)
                                                - (formik.values.netProgramCosts?.revenueActuals || 0)
                                            )}
                                        </div>
                                    </div>
                                    <div className={"col-3"}>
                                        <div
                                            className={"bg-info bg-opacity-10 border rounded text-end p-2 my-2"}>
                                            {currencyFormatter.format(
                                                (formik.values.netProgramCosts?.salaryNet || 0)
                                                + (formik.values.netProgramCosts?.benefitNet || 0)
                                                + (formik.values.netProgramCosts?.expenseNet || 0)
                                                + (formik.values.netProgramCosts?.serviceNet || 0)
                                                - (formik.values.netProgramCosts?.revenueNet || 0)
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Form>
        </FormikProvider>
    );
}

export default ApplicantInfo