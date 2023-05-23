import React from 'react'
import {Card} from "react-bootstrap";
import {currencyFormatter} from "../services/formatter";
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
        salaries: data.salaryData.reduce(aggregateData,s),
        benefits: data.benefitData.reduce(aggregateData,s),
        expenses: data.expenseData.reduce(aggregateData,s),
        services: data.serviceData.reduce(aggregateData,s),
        deductible: data.revenueData
            .filter(({revenue}) => revenue.match('Medicaid|Unencumbered Private Donation|Transportation reimbursement from LEAs'))
            .reduce(aggregateData, s),
        nondeductible: data.revenueData
            .filter(({revenue}) => !revenue.match('Medicaid|Unencumbered Private Donation|Transportation reimbursement from LEAs'))
            .reduce(aggregateData, s),
        revenue: data.revenueData.reduce(aggregateData, s),
    }
    console.log(summary.deductible)
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
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{summary.salaries.count}</td>
                        <td>Salaries</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.salaries.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.salaries.budget)}</td>
                    </tr>
                    <tr>
                        <td>{summary.benefits.count}</td>
                        <td>Benefits</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.benefits.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.benefits.budget)}</td>
                    </tr>
                    <tr>
                        <td>{summary.expenses.count}</td>
                        <td>Expenses</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.expenses.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.expenses.budget)}</td>
                    </tr>
                    <tr>
                        <td>{summary.services.count}</td>
                        <td>Services</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.services.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.services.budget)}</td>
                    </tr>
                    </tbody>
                    <thead>
                    <tr>
                        <th width={1}></th>
                        <th>Revenue</th>
                        <th className={"text-end"}>Actuals</th>
                        <th className={"text-end"}>Budgeted</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{summary.deductible.count}</td>
                        <td>Deductible</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.deductible.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.deductible.budget)}</td>
                    </tr>
                    <tr>
                        <td>{summary.nondeductible.count}</td>
                        <td>Non-deductible</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.nondeductible.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.nondeductible.budget)}</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td/>
                        <td>{`Total`}</td>
                        <td className={"text-end"}>{currencyFormatter.format(
                            parseInt(summary.salaries.actual)
                            + parseInt(summary.benefits.actual)
                            + parseInt(summary.expenses.actual)
                            + parseInt(summary.services.actual)
                            - parseInt(summary.deductible.actual)
                        )}</td>
                        <td className={"text-end"}>{currencyFormatter.format(
                            parseInt(summary.salaries.budget)
                            + parseInt(summary.benefits.budget)
                            + parseInt(summary.expenses.budget)
                            + parseInt(summary.services.budget)
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