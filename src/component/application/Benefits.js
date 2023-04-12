import {Card, Form, InputGroup} from "react-bootstrap";
import React from "react";
import Table from "react-bootstrap/Table";
import {number} from "yup";

const Benefits = () => {
    return (
        <>
            <Card>
                <Card.Body className={'bg-info text-dark bg-opacity-10'}>
                    <Form.Group>
                        <Form.Label>Benefit</Form.Label>
                        <Form.Select>
                            <option>FICA</option>
                            <option>Workers' Compensation</option>
                            <option>Unemployment</option>
                            <option>Group Health/Dental Insurance</option>
                            <option>Group Life Insurance</option>
                            <option>Disability Insurance</option>
                            <option>Pension</option>
                            <option>Profits Sharing</option>
                            <option>Tuition</option>
                            <option>Employee Gifts/Awards/Banquets</option>
                            <option>Other (please list below)</option>
                        </Form.Select>
                        <Form.Label>FY22 Actual</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control itemType={'number'}/>
                        </InputGroup>
                        <Form.Label>FY23 Budget</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control itemType={'number'}/>
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
    );
}
export default Benefits