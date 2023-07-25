import {Card} from "react-bootstrap";
import React from "react";


const ApplicantInfo = () => {
    return (
        <Card className={"col-4"}>
            <Card.Body>
                <p>John Smith</p>
                <h4>GREENWOOD SCHOOL</h4>[6-12]

                <address>
                    123 Summer St<br/>
                    Brattleboro, VT 01100
                </address>
            </Card.Body></Card>
    );
}

export default ApplicantInfo