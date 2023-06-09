import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {number, object, string} from 'yup';
import {Card, Nav, Tab} from "react-bootstrap";
import ApplicantInfo from "./ApplicantInfo";
import StaffSalaries from "./StaffSalaries";
import Benefits from "./Benefits";
import OffsettingRevenue from "./OffsettingRevenue";
import Summary from "./Summary";
import AllowableExpenses from "./AllowableExpenses";
import ContractedServiceProviders from "./ContractedServiceProviders";
// import {Benefit, Revenue, StaffSalary} from "../generated-sources/data.ts"

const Application = () => {
    const schema = object()
        .shape({
            name: string().required(), age: number().required(),
        })
        .required();

    const {formState: {errors}, register, handleSubmit} = useForm({
        resolver: yupResolver(schema),
    });

    const [applicantData, setApplicantData] = useState([])
    const [salaryData, setSalaryData] = useState([{
        'id': 510,
        'position': 'English Instructor',
        'category': 'staff',
        'status': 'employed',
        'fte': true,
        'speedu': 0,
        'pay': '60000',
        'actual': '63535',
        'budget': '63535'
    }])
    const [expenseData, setExpenseData] = useState([{
        'expense': 'Postage',
        'actual': '611',
        'budget': '680'
    }])
    const [serviceData, setServiceData] = useState([])
    const [benefitData, setBenefitData] = useState([
        {benefit:'FICA',actual:450,budget:500}
    ])
    const [revenueData, setRevenueData] = useState([
        {revenue:'Grant',actual:1500,budget:0}
    ])


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
                        <Nav.Link eventKey="five">Contracted Services</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="six">Offsetting Revenue</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="seven">Summary</Nav.Link>
                    </Nav.Item></Nav>
            </Card.Header>
            <Card.Body>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                        <ApplicantInfo data={applicantData} setData={setApplicantData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        <StaffSalaries data={salaryData} setData={setSalaryData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                        <Benefits data={benefitData} setData={setBenefitData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="four">
                        <AllowableExpenses data={expenseData} setData={setExpenseData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="five">
                        <ContractedServiceProviders data={serviceData} setData={setServiceData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="six">
                        <OffsettingRevenue data={revenueData} setData={setRevenueData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="seven">
                        <Summary data={{
                            'applicantData': applicantData,
                            'salaryData': salaryData,
                            'benefitData': benefitData,
                            'expenseData': expenseData,
                            'serviceData': serviceData,
                            'revenueData': revenueData
                        }}/>
                    </Tab.Pane>
                </Tab.Content>
            </Card.Body>
        </Card>
    </Tab.Container>);
}
export default Application