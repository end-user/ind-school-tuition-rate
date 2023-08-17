import {Button, Card, Col, Form, Row,} from "react-bootstrap";
import {useState} from "react";
import SchoolProvider, {School} from "../services/school-provider";
import {Field, Formik} from "formik";
import RateApplicationTable from "../shared/RateApplicationTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import {createColumnHelper} from "@tanstack/react-table";
import {SchoolHead} from "../shared/ts-model-data.ts";

const AddUser = () => {
    const addUser = () => {
    }
    const deleteRow = async (id: number) => {
        //todo this will be a call to the server
        console.debug(`delete table row ${id}`)
        const tmpData = [...contacts]
        tmpData.splice(id, 1)
        setContact(tmpData)
    }
    const [contacts, setContact] = useState([
        {name: 'Joseph', email: 'B', school: 'CENTERPOINT'},
        {name: 'Mary', email: 'B', school: 'CENTERPOINT'},
        {name: 'Patricia', email: 'B', school: 'ORCHARD VALLEY WALDORF SCHOOL'},
        {name: 'Elizabeth', email: 'B', school: 'PACEM SCHOOL'},
        {name: 'Eric', email: 'B', school: 'PUTNEY SCHOOL'},
        {name: 'William', email: 'B', school: 'ST PAULS ELEMENTARY SCHOOL'},
    ])
    const [schools, setSchools] = useState<School[]>()
    SchoolProvider.getSchools().then((_schools) => {
        setSchools(_schools)
    })
    const columnHelper = createColumnHelper<SchoolHead>()
    const cols =
        [
            columnHelper.accessor(row => row.name, {
                id: 'name',
                header: 'Name',
            }),
            columnHelper.accessor(row => row.email, {
                id: 'email',
                header: 'Email',
                cell: (table) => {
                    console.log(table)
                }
            }),
            columnHelper.accessor(row => row.school?.name, {
                id: 'school',
                header: 'School',
            }),
            columnHelper.display({
                id: 'delete',
                cell: (tableProps) => (
                    <Button variant={'link'} className={'text-success'} onClick={() => deleteRow(tableProps.row.index)}>
                        <FontAwesomeIcon icon={faSquareXmark}/>
                    </Button>
                ),
            })
        ]
    return (
        <Formik onSubmit={addUser}
                initialValues={{
                    'name': '',
                    'email': '',
                    'school': ''
                }}
        >
            {
                ({
                     handleSubmit,
                 }) => (
                    <>
                        <Form onSubmit={handleSubmit}>
                            <Card>
                                <Card.Body className={'bg-info text-dark bg-opacity-10'}>
                                    <Form.Group as={Row}>
                                        <Col sm={4}>
                                            <Form.Label>Name</Form.Label>
                                            <Field name="name"
                                                   className={"form-control"}
                                                   as={"input"}
                                                   required
                                            />

                                        </Col>
                                        <Col sm={4}>
                                            <Form.Label>Schools</Form.Label>
                                            <Field name="school"
                                                   as={Form.Select}
                                                   required
                                            >
                                                <option hidden value=''>Choose a School</option>
                                                {schools?.map(
                                                    o => <option key={o.name}>{o.name}</option>
                                                )}
                                            </Field>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Col sm={4}>
                                            <Form.Label>Email</Form.Label>
                                            <Field name="email"
                                                   className={"form-control"}
                                                   as={"input"}
                                                   required
                                            />
                                        </Col>
                                    </Form.Group>
                                </Card.Body>
                                <Card.Footer>
                                    <Button type={"submit"}>Change</Button>
                                </Card.Footer>
                            </Card>
                            <RateApplicationTable columns={cols} data={contacts}/>
                        </Form>
                    </>
                )
            }
        </Formik>
    );
}
/*


    <Card>

    </Card>
*/

export default AddUser