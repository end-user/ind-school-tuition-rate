import {Card} from "react-bootstrap";
import {currencyFormatter, percentFormatter} from "../services/formatter.js";
import Table from "react-bootstrap/Table";
import {Link, useParams} from "react-router-dom";

const s = {count: 0, actual: 0, budget: 0}
const sample = {
    applicantData: [],
    salaryData: [{
        'id': 510,
        'position': 'English Instructor',
        'category': 'staff',
        'status': 'employed',
        'fte': true,
        'speedu': 0,
        'pay': '60000',
        'actual': '53535',
        'budget': '55690'
    }],
    expenseData: [{
        'expense': 'Postage',
        'actual': '611',
        'budget': '680'
    }],
    serviceData: [],
    benefitData: [
        {benefit: 'FICA', actual: 450, budget: 500}
    ],
    revenueData: [
        {revenue: 'Grant', actual: 1500, budget: 0}
    ]
}
const aggregateData = (total, n) => ({
    count: total.count + 1 || 0,
    actual: parseInt(total.actual) + parseInt(n.actual),
    budget: parseInt(total.budget) + parseInt(n.budget)
})
const Reapply = ({data = sample}) => {
    // this should come from the database on load
    const COLA = 1.034

    const params = useParams();
    // redirect route if school doesn't qualify
    if (params.id === "2") {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Application <small>For school [...]</small></Card.Title>
                    <Card.Text><i>ineligible</i>: [...] has reapplied for continued tuition rate with COLA
                        increase for 3 of 3 years. A new tuition rate application must be made this year. Please
                        <Link to="/apply"> continue -&gt;</Link>
                    </Card.Text>
                </Card.Body></Card>
        )
    }

    console.log("looking at ", params)
    // deduct medicaid, unencumbered, transport only
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
        totalActualExpense: function () {
            return parseInt(this.salaries.actual)
                + parseInt(this.benefits.actual)
                + parseInt(this.expenses.actual)
                + parseInt(this.services.actual)
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
                <Card.Title>Reapplication <small>For school [...]</small></Card.Title>
                <Card.Text><span className={'fw-bold fst-italic'}> eligible</span>: [...] has reapplied continued
                    tuition rate with COLA increase
                    of {percentFormatter.format(COLA - 1)} for 0 of 3 years. </Card.Text>
                <Table hover className={"caption-top"}>
                    <thead>
                    <tr>
                        <th width={1}></th>
                        <th>Expenses</th>
                        <th className={"text-end"}>Prior Year</th>
                        <th className={"text-end"}>Updated</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{summary.salaries.count}</td>
                        <td>Staff Salaries</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.salaries.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.salaries.actual * COLA)}</td>
                    </tr>
                    <tr>
                        <td>{summary.benefits.count}</td>
                        <td>Staff Benefits</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.benefits.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.benefits.actual * COLA)}</td>
                    </tr>
                    <tr>
                        <td>{summary.expenses.count}</td>
                        <td>Expenses</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.expenses.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.expenses.actual * COLA)}</td>
                    </tr>
                    <tr>
                        <td>{summary.services.count}</td>
                        <td>Services</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.services.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.services.actual * COLA)}</td>
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
                            summary.totalActualExpense() * COLA
                        )}</td>
                    </tr>
                    </tbody>
                    <thead>
                    <tr>
                        <th width={1}></th>
                        <th>Revenue</th>
                        <th className={"text-end"}>Prior Year</th>
                        <th className={"text-end"}>Updated</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{summary.deductible.count}</td>
                        <td>Offsetting</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.deductible.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.deductible.actual * COLA)}</td>
                    </tr>
                    <tr>
                        <td>{summary.nondeductible.count}</td>
                        <td>other</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.nondeductible.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.nondeductible.actual * COLA)}</td>
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
                            (
                                summary.totalActualExpense()
                                - parseInt(summary.deductible.actual)
                            ) * COLA
                        )}</td>
                    </tr>
                    </tfoot>
                </Table>
                <Card.Text>(more text)</Card.Text>
            </Card.Body>
        </Card>

    );
}
export default Reapply