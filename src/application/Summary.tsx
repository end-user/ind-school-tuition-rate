import {Card} from "react-bootstrap";
import {currencyFormatter, percentFormatter} from "../services/formatter.js";
import Table from "react-bootstrap/Table";
import {
    AllowableExpense,
    Benefit,
    ContractedService,
    Revenue,
    StaffSalary
} from '../shared/ts-model-data.ts';

const s = {count: 0, actual: 0, budget: 0}

const aggregateData = (total: any, n: any) => ({
    count: total.count + 1 || 0,
    actual: parseInt(total.actual) + parseInt(n.actual),
    budget: parseInt(total.budget) + parseInt(n.budget)
})
const Summary = ({data}: {
    data: {
        applicantData: any[],
        salaryData: StaffSalary[],
        benefitData: Benefit[],
        expenseData: AllowableExpense[],
        serviceData: ContractedService[],
        revenueData: Revenue[]
    }
}) => {
    // deduct medicaid, unencumbered, transport only
    //window.testData = data;
    let summary = {
        applicantData: data.applicantData,
        salaries: data.salaryData.reduce(aggregateData, s),
        benefits: data.benefitData.reduce(aggregateData, s),
        expenses: data.expenseData.reduce(aggregateData, s),
        services: data.serviceData.reduce(aggregateData, s),
        deductible: data.revenueData
            .filter(({revenueSource}) => revenueSource?.match('Medicaid|Unencumbered Private Donation|Transportation reimbursement from LEAs'))
            .reduce(aggregateData, s),
        nondeductible: data.revenueData
            .filter(({revenueSource}) => !revenueSource?.match('Medicaid|Unencumbered Private Donation|Transportation reimbursement from LEAs'))
            .reduce(aggregateData, s),
        revenue: data.revenueData.reduce(aggregateData, s),
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
    //window.sumDebug = summary
    return (
        <Card>
            <Card.Body>
                <Card.Title>Application <small>For school [...]</small></Card.Title>
                <Table hover className={"caption-top"}>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Expenses</th>
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
                        <td>{parseInt(summary.salaries.count)
                            + parseInt(summary.benefits.count)
                            + parseInt(summary.expenses.count)
                            + parseInt(summary.services.count)}</td>
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
                        <th></th>
                        <th>Revenue</th>
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
                    <tfoot>
                    <tr className={"bg-secondary"}>
                        <td/>
                        <td>Subtotal</td>
                        <td className={"text-end"}>{currencyFormatter.format(
                            summary.totalActualExpense()
                            - summary.deductible.actual
                        )}</td>
                        <td className={"text-end"}>{currencyFormatter.format(
                            summary.totalBudgetExpense()
                            - summary.deductible.budget
                        )}</td>
                    </tr>
                    </tfoot>
                </Table>
                <Card.Text>(more text)</Card.Text>
            </Card.Body>
        </Card>

    );
}
export default Summary