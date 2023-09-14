import {Card} from "react-bootstrap";

const Home = () => {

    return (
        <Card>
            <Card.Body>
                <Card.Title>User paths</Card.Title>
                <ul>
                    <li><a href={"/apply"}>John Smith from Long Trail School wants to start a new application</a></li>
                    <li><a href={"/reapply/1"}>Emily Parker is going to reapply with COLA</a> (school is eligible)</li>
                    <li><a href={"/reapply/2"}>Dean Peterson is going to reapply with COLA</a> (school is NOT eligible)
                    </li>
                </ul>
                <Card.Title>Admin paths</Card.Title>
                <ul>
                    <li><a href={"/admin/cola"}>change COLA value</a> (does not currently update the site's value)</li>
                    <li><a href={"/admin/review"}>review submitted applications</a></li>
                    <li><a href={"/admin/users"}>manage users</a></li>
                    <li><a href={"/admin/schools"}>schools</a></li>
                    <li>view tuition reports</li>
                </ul>
            </Card.Body>
        </Card>
    )
}
export default Home