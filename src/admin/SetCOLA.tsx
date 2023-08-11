import {Button, Card, Col, Form, InputGroup} from "react-bootstrap";
import React from "react";
import {Field, Formik} from "formik";

const addRow = () => {
}

const SetCOLA = () => {
    const COLA = 0.034
    return (
        <Formik onSubmit={addRow}
                initialValues={{
                    'cola': COLA
                }}
        >
            {
                ({
                     handleSubmit,
                 }) => (
                    <>
                        <Form onSubmit={handleSubmit}>
                            <Card>
                                <Card.Body>
                                    <Col sm={2}>
                                        <Form.Label>Current COLA rate</Form.Label>
                                        <InputGroup>
                                            <Field as={"input"}
                                                   className={"form-control"}
                                                   name="cola"
                                                   type="number"/>
                                            <InputGroup.Text>%</InputGroup.Text>
                                        </InputGroup>
                                    </Col>
                                </Card.Body>
                                <Card.Footer>
                                    <Button type={"submit"}>Change</Button>
                                </Card.Footer>
                            </Card>
                        </Form>
                    </>
                )
            }
        </Formik>
    );
}

export default SetCOLA