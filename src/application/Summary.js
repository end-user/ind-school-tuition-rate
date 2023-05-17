import React from 'react'
import {Card} from "react-bootstrap";
import {currencyFormatter} from "../services/formatter";
import Table from "react-bootstrap/Table";

const Summary = ({data}) => {
    // deduct medicaid, unencumbered, transport only


    const s = {count: 0, actual: 0, budget: 0}
    let summary = {
        salaries: data.salaryData.reduce((total, n) => ({
            count: total.count + 1 || 0,
            actual: parseInt(total.actual) + parseInt(n.actual),
            budget: parseInt(total.budget) + parseInt(n.budget)
        }), s),
        benefits: data.benefitData.reduce((total, n) => ({
            count: total.count + 1 || 0,
            actual: parseInt(total.actual) + parseInt(n.actual),
            budget: parseInt(total.budget) + parseInt(n.budget)
        }), s),
        expenses: data.expenseData.reduce((total, n) => ({
            count: total.count + 1 || 0,
            actual: parseInt(total.actual) + parseInt(n.actual),
            budget: parseInt(total.budget) + parseInt(n.budget)
        }), s),
        revenue: data.revenueData.reduce((total, n) => ({
            count: total.count + 1 || 0,
            actual: parseInt(total.actual) + parseInt(n.actual),
            budget: parseInt(total.budget) + parseInt(n.budget)
        }), s),

    }
    console.log(summary)

    return (
        <Card>
            <Card.Body>
                <Card.Title>Application <small>For school [...]</small></Card.Title>

                <Table>
                    <tbody>
                    <tr>
                        <td>Salaries: <small>({summary.salaries.count})</small></td>
                        <td>{currencyFormatter.format(summary.salaries.actual)}</td>
                        <td>{currencyFormatter.format(summary.salaries.budget)}</td>
                    </tr>
                    <tr>
                        <td>Benefits: <small>({summary.benefits.count})</small></td>
                        <td>{currencyFormatter.format(summary.benefits.actual)}</td>
                        <td>{currencyFormatter.format(summary.benefits.budget)}</td>
                    </tr>
                    <tr>
                        <td>Expenses: <small>({summary.expenses.count})</small></td>
                        <td>{currencyFormatter.format(summary.expenses.actual)}</td>
                        <td>{currencyFormatter.format(summary.expenses.budget)}</td>
                    </tr>
                    <tr>
                        <td>Revenue: <small>({summary.revenue.count})</small></td>
                        <td>{currencyFormatter.format(summary.revenue.actual)}</td>
                        <td>{currencyFormatter.format(summary.revenue.budget)}</td>
                    </tr>
                    <tr>
                        <td>{`Total`}</td>
                        <td>{currencyFormatter.format(
                            parseInt(summary.salaries.actual)
                            + parseInt(summary.benefits.actual)
                            + parseInt(summary.expenses.actual)
                        )}</td>
                        <td>{currencyFormatter.format(
                            parseInt(summary.salaries.budget)
                            + parseInt(summary.benefits.budget)
                            + parseInt(summary.expenses.budget)
                        )}</td>
                    </tr>
                    </tbody>
                </Table>
                <Card.Text>final</Card.Text>
            </Card.Body>
        </Card>

    );
}
export default Summary