import {useState} from 'react'
import {Card, Nav, Tab} from "react-bootstrap";
import ApplicantInfo from "./ApplicantInfo";
import StaffSalaries from "./StaffSalaries";
import Benefits from "./Benefits";
import OffsettingRevenue from "./OffsettingRevenue";
import Summary from "./Summary";
import AllowableExpenses from "./AllowableExpenses";
import ContractedServiceProviders from "./ContractedServiceProviders";
import FY from "../shared/FY"
import {
    AllowableExpense,
    Benefit,
    ContractedService, NetProgramCosts,
    RateApplication,
    Revenue,
    SchoolHead,
    StaffSalary
} from '../shared/ts-model-data.ts';
import Assurances from "./Assurances.tsx";
import {useParams} from "react-router-dom";
import {mockSchoolHead, rateApplications} from "../shared/mock-data.ts";

const Application = () => {
    // This will be the id of the RateApplication that was passed by the router
    const {appId} = useParams()
    // todo: lookup app based on id
    // todo: axios will include credentials for lookup.
    const rateApplication: RateApplication | undefined = rateApplications.find(({id}) => id === Number(appId))
    /*const schema = object()
        .shape({
            name: string().required(), age: number().required(),
        })
        .required();

    const {
        formState: {errors},
        register,
        handleSubmit
    } = useForm({
        resolver: yupResolver(schema),
    });*/

    const fy = new FY(rateApplication ? Number(rateApplication.schoolYear) : new Date().getFullYear())
    const schoolHead: SchoolHead = rateApplication?.schoolHead ? rateApplication?.schoolHead : mockSchoolHead;

    const [netCosts, setNetCosts] = useState<NetProgramCosts>(rateApplication?.netProgramCosts || {})
    const [salaryData, setSalaryData] = useState<StaffSalary[]>(rateApplication?.staffSalaries || [])
    const [expenseData, setExpenseData] = useState<AllowableExpense[]>(rateApplication?.expenses || [])
    const [serviceData, setServiceData] = useState<ContractedService[]>(rateApplication?.contractedServices || [])
    const [benefitData, setBenefitData] = useState<Benefit[]>(rateApplication?.benefits || [])
    const [revenueData, setRevenueData] = useState<Revenue[]>(rateApplication?.revenues || [])
    return (<Tab.Container defaultActiveKey={'applicantInfo'}>
        <Card>
            <Card.Header>
                <Card.Title>Tuition Rate Application for {fy.thisFull()}</Card.Title>
                <Nav variant={'tabs'}>
                    <Nav.Item>
                        <Nav.Link eventKey="applicantInfo">Applicant Info</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="assurances">Assurances</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="staffSalaries">Staff Salaries</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="benefits">Benefits</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="allowableExpenses">Allowable Expenses</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="contractedServices">Contracted Services</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="offsettingRevenue">Offsetting Revenue</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="summary">Summary</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <Tab.Content>
                    <Tab.Pane eventKey="applicantInfo">
                        <ApplicantInfo fy={fy} schoolHead={schoolHead} netCosts={netCosts} setNetCosts={setNetCosts}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="assurances">
                        <Assurances/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="staffSalaries">
                        <StaffSalaries fy={fy} data={salaryData} setData={setSalaryData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="benefits">
                        <Benefits fy={fy} data={benefitData} setData={setBenefitData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="allowableExpenses">
                        <AllowableExpenses fy={fy} data={expenseData} setData={setExpenseData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="contractedServices">
                        <ContractedServiceProviders fy={fy} data={serviceData} setData={setServiceData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="offsettingRevenue">
                        <OffsettingRevenue fy={fy} data={revenueData} setData={setRevenueData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="summary">
                        <Summary fy={fy} data={{
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