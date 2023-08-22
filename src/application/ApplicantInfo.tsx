import {Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import {Field, Formik} from "formik";
import {currencyFormatter} from "../services/formatter.js";

const ApplicantInfo = ({data}: { data: any[] }) => {
    if (data != null) {/*got data*/
    }
    return (
        <div className={"row"}>
            <div className={"col-4"}>
                <Card>
                    <Card.Header>Rule 2232 (2)</Card.Header>
                    <Card.Body>
                        <p>John Smith</p>
                        <h4>GREENWOOD SCHOOL</h4>[6-12]

                        <address>
                            123 Summer St<br/>
                            Brattleboro, VT 01100
                        </address>
                    </Card.Body>
                </Card>
            </div>
            <div className={"col-8"}>
                <Formik enableReinitialize
                        initialValues={{
                            salaryActual: 100,
                            salaryNet: 0,
                            benefitActual: 0,
                            benefitNet: 0,
                            expenseActual: 0,
                            expenseNet: 0,
                            serviceActual: 0,
                            serviceNet: 0,
                            revenueActual: 0,
                            revenueNet: 0
                        }}
                >
                    {({
                          values,
                          handleSubmit,
                      }) => (<>
                            <Form onSubmit={handleSubmit}>
                                <Card>
                                    <Card.Header>FY24 Tuition Rate- Net Program Costs</Card.Header>
                                    <Card.Body>
                                        <Form.Group as={Row}>
                                            <Col className={'offset-5 col-3'}>
                                                <Form.Label>FY23 Actuals</Form.Label>
                                            </Col>
                                            <Col className={'col-3'}>
                                                <Form.Label>FY24 Net Program Costs</Form.Label>
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
                                                           name="salaryActual"
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
                                                           name="benefitActual"
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
                                                           name="expenseActual"
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
                                                           name="serviceActual"
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
                                                           name="revenueActual"
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
                                                        values.salaryActual + values.benefitActual + values.expenseActual
                                                        + values.serviceActual - values.revenueActual
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
                            </Form>
                        </>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default ApplicantInfo