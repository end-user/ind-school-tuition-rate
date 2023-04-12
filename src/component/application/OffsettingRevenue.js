import {Card, Form, InputGroup} from "react-bootstrap";
import {CardBody, CardTitle} from "reactstrap";
import React from "react";
import {number} from "yup";
import Table from "react-bootstrap/Table";

const OffsettingRevenue = () => {
    return (
        <>
            <Card>
                <Card.Body className={'bg-info text-dark bg-opacity-10'}>
                    <Form.Group>
                        <Form.Label>Revenue</Form.Label>
                        <Form.Select>
                            <option>Medicaid</option>
                            <option>Free & Reduced Lunch Program</option>
                            <option>Encumbered Donation</option>
                            <option>Unencumbered Private Donation</option>
                            <option>ESY Services</option>
                            <option>Transportation reimbursement from LEAs</option>
                            <option>Bank loan</option>
                            <option>Grant</option>
                            <option>COVID Extended Support Funding</option>
                            <option>Title Funding  Title IA, Title II or Title IV</option>
                            <option>Payroll loan</option>
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
                    <th>Revenue</th>
                    <th>FY22 Actual</th>
                    <th>FY23 Budget</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Free & Reduced Lunch Program</td>
                    <td>$ 6,381</td>
                    <td>$ 6,500</td>
                </tr>
                <tr>
                    <td>Grant</td>
                    <td>$ 10,000</td>
                    <td>$ 10,000</td>
                </tr>
                </tbody>
            </Table>
        </>
    );
}
export default OffsettingRevenue