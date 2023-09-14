import {Button, Card} from "react-bootstrap";
import {currencyFormatter, percentFormatter} from "../services/formatter.js";
import Table from "react-bootstrap/Table";
import {
    AllowableExpense,
    Benefit,
    ContractedService,
    Revenue,
    SchoolProfile,
    StaffSalary
} from '../shared/ts-model-data.ts';
import FY from "../shared/FY.tsx";


interface S {
    count: number;
    actual: number;
    budget: number;
}

const s: S = {count: 0, actual: 0, budget: 0}

const aggregateData = (accumulator: S, currentValue: StaffSalary | Benefit | AllowableExpense | ContractedService | Revenue) => ({
    count: accumulator.count + 1 || 0,
    actual: accumulator.actual + (currentValue.actual || 0),
    budget: accumulator.budget + (currentValue.budget || 0)
})
const Summary = ({fy, enrollment, school, data}: {
    fy: FY,
    enrollment: number,
    school: SchoolProfile | undefined,
    data: {
        salaryData: StaffSalary[],
        benefitData: Benefit[],
        expenseData: AllowableExpense[],
        serviceData: ContractedService[],
        revenueData: Revenue[]
    }
}) => {
    // deduct medicaid, unencumbered, transport only
    const summary = {
        salaries: data.salaryData.reduce((accumulator, currentValue) => aggregateData(accumulator, currentValue), s),
        benefits: data.benefitData.reduce((accumulator, currentValue) => aggregateData(accumulator, currentValue), s),
        expenses: data.expenseData.reduce((accumulator, currentValue) => aggregateData(accumulator, currentValue), s),
        services: data.serviceData.reduce((accumulator, currentValue) => aggregateData(accumulator, currentValue), s),
        deductible: data.revenueData
            .filter(({revenueSource}) => revenueSource?.match('Medicaid|Unencumbered Private Donation|Transportation reimbursement from LEAs'))
            .reduce((accumulator, currentValue) => aggregateData(accumulator, currentValue), s),
        nondeductible: data.revenueData
            .filter(({revenueSource}) => !revenueSource?.match('Medicaid|Unencumbered Private Donation|Transportation reimbursement from LEAs'))
            .reduce(aggregateData, s),
        revenue: data.revenueData.reduce((accumulator, currentValue) => aggregateData(accumulator, currentValue), s),
        totalActualExpense: function () {
            return this.salaries.actual
                + this.benefits.actual
                + this.expenses.actual
                + this.services.actual
        },
        totalBudgetExpense: function () {
            return this.salaries.budget
                + this.benefits.budget
                + this.expenses.budget
                + this.services.budget
        }
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>Application <small>For school [...] for {fy.thisFull()}</small></Card.Title>
                <Table hover className={"caption-top"}>
                    <thead>
                    <tr>
                        <th colSpan={2}>Expenses</th>
                        <th className={"text-end"}>Actuals</th>
                        <th className={"text-end"}>Budgeted</th>
                        <th className={"text-end"}>yoy</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{summary.salaries.count}</td>
                        <td>Staff Salaries</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.salaries.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.salaries.budget)}</td>
                        <td className={"text-end"}>{percentFormatter.format((summary.salaries.budget - summary.salaries.actual) / summary.salaries.actual || 0)}</td>
                    </tr>
                    <tr>
                        <td>{summary.benefits.count}</td>
                        <td>Staff Benefits</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.benefits.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.benefits.budget)}</td>
                        <td className={"text-end"}>{percentFormatter.format((summary.benefits.budget - summary.benefits.actual) / summary.benefits.actual || 0)}</td>
                    </tr>
                    <tr>
                        <td>{summary.expenses.count}</td>
                        <td>Expenses</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.expenses.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.expenses.budget)}</td>
                        <td className={"text-end"}>{percentFormatter.format((summary.expenses.budget - summary.expenses.actual) / summary.expenses.actual || 0)}</td>
                    </tr>
                    <tr>
                        <td>{summary.services.count}</td>
                        <td>Services</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.services.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.services.budget)}</td>
                        <td className={"text-end"}>{percentFormatter.format((summary.services.budget - summary.services.actual) / summary.services.actual || 0)}</td>
                    </tr>
                    <tr className={"bg-secondary"}>
                        <td>{summary.salaries.count
                            + summary.benefits.count
                            + summary.expenses.count
                            + summary.services.count}</td>
                        <td>Subtotal</td>
                        <td className={"text-end"}>{currencyFormatter.format(
                            summary.totalActualExpense()
                        )}</td>
                        <td className={"text-end"}>{currencyFormatter.format(
                            summary.totalBudgetExpense()
                        )}</td>

                        <td className={"text-end"}>{percentFormatter.format((summary.totalBudgetExpense() - summary.totalActualExpense()) / summary.totalActualExpense() || 0)}</td>
                    </tr>
                    </tbody>
                    <thead>
                    <tr>
                        <th colSpan={2}>Revenue</th>
                        <th className={"text-end"}>Actuals</th>
                        <th className={"text-end"}>Budgeted</th>
                        <th className={"text-end"}>yoy</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{summary.deductible.count}</td>
                        <td>Offsetting</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.deductible.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.deductible.budget)}</td>
                        <td className={"text-end"}>{percentFormatter.format((summary.deductible.budget - summary.deductible.actual) / summary.deductible.actual || 0)}</td>
                    </tr>
                    <tr>
                        <td>{summary.nondeductible.count}</td>
                        <td>other</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.nondeductible.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.nondeductible.budget)}</td>
                        <td className={"text-end"}>{percentFormatter.format((summary.nondeductible.budget - summary.nondeductible.actual) / summary.nondeductible.actual || 0)}</td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr className={"bg-secondary"}>
                        <td colSpan={2}>Subtotal</td>
                        <td className={"text-end"}>{currencyFormatter.format(
                            summary.totalActualExpense()
                            - summary.deductible.actual
                        )}</td>
                        <td className={"text-end"}>{currencyFormatter.format(
                            summary.totalBudgetExpense()
                            - summary.deductible.budget
                        )}</td>
                        <td/>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td colSpan={2}>Enrollment (SBE approved capacity {school?.approvedCapacity})</td>
                        <td colSpan={2}>{enrollment}</td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td colSpan={3}>Rate Request</td>

                        <td className={"text-end"}>{currencyFormatter.format(
                            (
                                summary.totalBudgetExpense()
                                - summary.deductible.budget
                            ) / (enrollment || 1)
                        )}</td>
                    </tr>
                    </tbody>
                </Table>
                <Card.Text>I assert this is all good <Button type={"submit"}>Submit Application</Button>
                </Card.Text>
                <Card.Text className={"text-danger-emphasis bg-danger-subtle"}>you didn't check the box. Please go back
                    to <i>Assurances</i> and confirm you've read and understand</Card.Text>
            </Card.Body>
        </Card>

    );
}
export default Summary