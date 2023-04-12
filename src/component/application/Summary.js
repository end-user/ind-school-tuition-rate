import {Card} from "react-bootstrap";
import {CardBody, CardTitle} from "reactstrap";
import React, {useState} from "react";

const Summary = () => {
    const [expenses, setExpenses] = useState([])
    return (
        <Card>
            <CardTitle>Application</CardTitle>
            <CardBody>For school...

                <div>{expenses}</div>
            </CardBody>
        </Card>

    );
}
export default Summary