import React from 'react'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {number, object, string} from 'yup';
import {Card, Form, Nav, Tab} from "react-bootstrap";
import ApplicantInfo from "./ApplicantInfo";
import StaffSalaries from "./StaffSalaries";
import Benefits from "./Benefits";
import OffsettingRevenue from "./OffsettingRevenue";
import Summary from "./Summary";
import AllowableExpenses from "./AllowableExpenses";

const Application = () => {
    const schema = object()
        .shape({
            name: string().required(), age: number().required(),
        })
        .required();

    const {formState: {errors}, register, handleSubmit} = useForm({
        resolver: yupResolver(schema),
    });


    return (<Tab.Container defaultActiveKey={'first'}>
        <Card>
            <Card.Header>
                <Card.Title>Tuition Rate Application</Card.Title>
                <Nav variant={'tabs'}>
                    <Nav.Item>
                        <Nav.Link eventKey="first">Applicant Info</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="second">Staff Salaries</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="third">Benefits</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="four">Allowable Expenses</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="five">Offsetting Revenue</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="six">Summary</Nav.Link>
                    </Nav.Item></Nav>
            </Card.Header>
            <Card.Body>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <ApplicantInfo/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <StaffSalaries/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            <Benefits/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="four">
                            <AllowableExpenses/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="five">
                            <OffsettingRevenue/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="six">
                            <Summary/>
                        </Tab.Pane>
                    </Tab.Content>
            </Card.Body>
        </Card>
    </Tab.Container>);
}
export default Application