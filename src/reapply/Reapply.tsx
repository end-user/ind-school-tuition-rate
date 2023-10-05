import {Card} from "react-bootstrap";
import {currencyFormatter, percentFormatter} from "../services/formatter.js";
import Table from "react-bootstrap/Table";
import {Link, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {
    AllowableExpense,
    Benefit,
    ContractedService,
    RateApplication,
    Revenue,
    SchoolProfile,
    StaffSalary
} from "../shared/ts-model-data.ts";
import {mockRateApplications, mockSchoolList} from "../shared/mock-data.ts";

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

const Reapply = () => {
    /*todo: workflow -
        lookup id, determine if reapply is within constraint
        if yes, return success, previous RateApp, COLA, so that re-up can be calculated and submitted.
        if no, return fail, SchoolProfile, forwarding link will point to /apply (no id, school will be pulled from auth)

     */

    // this should come from the database on load
    const COLA = useRef(1.034)
    const {appId} = useParams();
    const [school, setSchool] = useState<SchoolProfile>()
    const [rateApp, setRateApp] = useState<RateApplication>()
    const checkReapply = async () => {

        /* todo This should work once the backend is operational.
        await ApplicationProvider.checkReapply()
            .then((results) => {
                    COLA.current = results.cola
                    if (results.permitted) {
                        setRateApp(results.app)
                    } else {
                        setSchool(results.school)
                    }
                }
            )
          */

        if (appId === "2") {
            setSchool(await
                (async () => mockSchoolList)()
                    .then((schools) => {
                        //console.log("got list", selected)
                        return schools.find((s) => s.orgId === 'IS077')
                    })
            )
        } else {
            setRateApp(mockRateApplications.find((a) => a.id === 1))
        }
    }

    useEffect(() => {
        checkReapply()
    },);

    // redirect route if school doesn't qualify
    if (appId === "2") {

        return (
            <Card>
                <Card.Body>
                    <Card.Title>Application <small>for {school?.name}</small></Card.Title>
                    <Card.Text><i>ineligible</i>: {school?.name} has reapplied for continued tuition rate with COLA
                        increase for 3 of 3 years. A new tuition rate application must be made this year. Please
                        <Link to="/apply"> continue -&gt;</Link>
                    </Card.Text>
                </Card.Body></Card>
        )
    }

    // deduct medicaid, unencumbered, transport only
    const summary = {
        salaries: (rateApp?.staffSalaries || []).reduce(aggregateData, s),
        benefits: (rateApp?.benefits || []).reduce(aggregateData, s),
        expenses: (rateApp?.expenses || []).reduce(aggregateData, s),
        services: (rateApp?.contractedServices || []).reduce(aggregateData, s),
        deductible: (rateApp?.revenues || [])
            .filter(({revenueSource}) => revenueSource?.match('Medicaid|Unencumbered Private Donation|Transportation reimbursement from LEAs'))
            .reduce(aggregateData, s),
        nondeductible: (rateApp?.revenues || [])
            .filter(({revenueSource}) => !revenueSource?.match('Medicaid|Unencumbered Private Donation|Transportation reimbursement from LEAs'))
            .reduce(aggregateData, s),
        revenue: (rateApp?.revenues || []).reduce(aggregateData, s),
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
                <Card.Title>Reapplication <small>For school {rateApp?.schoolHead?.schoolProfile?.name}</small></Card.Title>
                <Card.Text><span className={'fw-bold fst-italic'}> eligible</span>: {rateApp?.schoolHead?.schoolProfile?.name} has reapplied continued
                    tuition rate with COLA increase
                    of {percentFormatter.format(COLA.current - 1)} for 0 of 3 years. </Card.Text>
                <Table hover className={"caption-top"}>
                    <thead>
                    <tr>
                        <th></th>
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
                        <td className={"text-end"}>{currencyFormatter.format(summary.salaries.actual * COLA.current)}</td>
                    </tr>
                    <tr>
                        <td>{summary.benefits.count}</td>
                        <td>Staff Benefits</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.benefits.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.benefits.actual * COLA.current)}</td>
                    </tr>
                    <tr>
                        <td>{summary.expenses.count}</td>
                        <td>Expenses</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.expenses.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.expenses.actual * COLA.current)}</td>
                    </tr>
                    <tr>
                        <td>{summary.services.count}</td>
                        <td>Services</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.services.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.services.actual * COLA.current)}</td>
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
                            summary.totalActualExpense() * COLA.current
                        )}</td>
                    </tr>
                    </tbody>
                    <thead>
                    <tr>
                        <th></th>
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
                        <td className={"text-end"}>{currencyFormatter.format(summary.deductible.actual * COLA.current)}</td>
                    </tr>
                    <tr>
                        <td>{summary.nondeductible.count}</td>
                        <td>other</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.nondeductible.actual)}</td>
                        <td className={"text-end"}>{currencyFormatter.format(summary.nondeductible.actual * COLA.current)}</td>
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
                            (
                                summary.totalActualExpense()
                                - summary.deductible.actual
                            ) * COLA.current
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