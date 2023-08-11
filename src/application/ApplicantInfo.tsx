import {Card} from "react-bootstrap";


const ApplicantInfo = ({data, setData}: { data: any[], setData: React.Dispatch<React.SetStateAction<any[]>> }) => {
    if (data != null) {/*got data*/
    }
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