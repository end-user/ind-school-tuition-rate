import React from 'react'
import {Card} from "react-bootstrap";
import {currencyFormatter, percentFormatter} from "../services/formatter";
import Table from "react-bootstrap/Table";

const s = {count: 0, actual: 0, budget: 0}

const aggregateData = (total, n) => ({
    count: total.count + 1 || 0,
    actual: parseInt(total.actual) + parseInt(n.actual),
    budget: parseInt(total.budget) + parseInt(n.budget)
})
const Summary = ({data}) => {
    // deduct medicaid, unencumbered, transport only
    window.testData = data;
    let summary = {
        salaries: data.salaryData.reduce(aggregateData, s),
        benefits: data.benefitData.reduce(aggregateData, s),
        expenses: data.expenseData.reduce(aggregateData, s),
        services: data.serviceData.reduce(aggregateData, s),
        deductible: data.revenueData
            .filter(({revenue}) => revenue.match('Medicaid|Unencumbered Private Donation|Transportation reimbursement from LEAs'))
            .reduce(aggregateData, s),
        nondeductible: data.revenueData
            .filter(({revenue}) => !revenue.match('Medicaid|Unencumbered Private Donation|Transportation reimbursement from LEAs'))
            .reduce(aggregateData, s),
        revenue: data.revenueData.reduce(aggregateData, s),
        totalActualExpense:function(){
            return parseInt(this.salaries.actual)
            + parseInt(this.benefits.actual)
            + parseInt(this.expenses.actual)
            + parseInt(this.services.actual)
        },
        totalBudgetExpense:function(){
            return parseInt(this.salaries.budget)
                + parseInt(this.benefits.budget)
                + parseInt(this.expenses.budget)
                + parseInt(this.services.budget)
        }
    }
window.sumDebug=summary
    return (
        <Card>
            <Card.Body>
                <Card.Title>Application <small>For school [...]</small></Card.Title>
                <Table hover className={"caption-top"}>
                    <thead>
                    <tr>
                        <th width={1}></th>
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
                        <th width={1}></th>
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
                            - parseInt(summary.deductible.actual)
                        )}</td>
                        <td className={"text-end"}>{currencyFormatter.format(
                            summary.totalBudgetExpense()
                            - parseInt(summary.deductible.budget)
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