import {useState} from 'react'
import {Card, Nav, Tab} from "react-bootstrap";
import ApplicantInfo from "./ApplicantInfo";
import StaffSalaries from "./StaffSalaries";
import Benefits from "./Benefits";
import OffsettingRevenue from "./OffsettingRevenue";
import Summary from "./Summary";
import AllowableExpenses from "./AllowableExpenses";
import ContractedServiceProviders from "./ContractedServiceProviders";
import {
    AllowableExpense,
    Benefit,
    ContractedService,
    Revenue,
    StaffSalary
} from '../../target/generated-sources/ts-model-data';
import Assurances from "./Assurances.tsx";

const Application = () => {
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

    const [applicantData] = useState<any[]>([])
    const [salaryData, setSalaryData] = useState<StaffSalary[]>([{
        id: 510,
        staffCategory: 'staff',
        status: 'employed',
        fte: 1,
        speEdu: 0,
        positionTitle: 'English Instructor',
        payRate: 60000,
        actual: 53535,
        budget: 55690
    }])
    const [expenseData, setExpenseData] = useState<AllowableExpense[]>([{
        expense: 'Postage',
        actual: 611,
        budget: 680
    }])
    const [serviceData, setServiceData] = useState<ContractedService[]>([])
    const [benefitData, setBenefitData] = useState<Benefit[]>([
        {benefit: 'FICA', actual: 450, budget: 500}
    ])
    const [revenueData, setRevenueData] = useState<Revenue[]>([
        {revenueSource: 'Grant', actual: 1500, budget: 0}
    ])


    return (<Tab.Container defaultActiveKey={'applicantInfo'}>
        <Card>
            <Card.Header>
                <Card.Title>Tuition Rate Application</Card.Title>
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
                        <ApplicantInfo data={applicantData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="assurances">
                        <Assurances/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="staffSalaries">
                        <StaffSalaries data={salaryData} setData={setSalaryData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="benefits">
                        <Benefits data={benefitData} setData={setBenefitData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="allowableExpenses">
                        <AllowableExpenses data={expenseData} setData={setExpenseData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="contractedServices">
                        <ContractedServiceProviders data={serviceData} setData={setServiceData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="offsettingRevenue">
                        <OffsettingRevenue data={revenueData} setData={setRevenueData}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="summary">
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