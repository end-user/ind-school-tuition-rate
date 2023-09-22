import {Button, Card, Col, Form, Row,} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import SchoolProvider, {School} from "../services/school-provider";
import {Field, Formik, FormikHelpers} from "formik";
import RateApplicationTable from "../shared/RateApplicationTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import {createColumnHelper} from "@tanstack/react-table";
import {SchoolProfile} from "../shared/ts-model-data.ts";
import {mockSchoolList} from "../shared/mock-data.ts";

type SchoolProfileStatus = SchoolProfile & { closed?: boolean }
const Schools = () => {
    const [sourceSchools, setSourceSchools] = useState<School[]>([])
    const loadSourceSchools = async () => {
        setSourceSchools(await SchoolProvider.getSchools())
    }
    // from the application
    const [recordedSchools, setRecordedSchools] = useState<SchoolProfileStatus[]>([])
    const loadRecordedSchools = async () => {
        // todo: this is a mock promise.  This will get replaced with a service call
        setRecordedSchools(await
            (async () => mockSchoolList)()
                .then((selected) => {
                    //console.log("got list", selected)
                    return selected
                })
        )
    }
    // used to populate the dropdown
    const [schoolChoices, setSchoolChoices] = useState<(School)[]>([])
    const markedClosedSchools = useRef(false);

    const addSchool = (values: SchoolProfileStatus, helpers: FormikHelpers<SchoolProfileStatus>) => {
        helpers.resetForm()
        console.log(`add ${values.orgId} to ${recordedSchools.map(({orgId}) => orgId)}`)
        const dataRecord = schoolChoices.find(({OrgID}) => OrgID === values.orgId)
        if (dataRecord == undefined) {
            console.log(`unable to find school ${values.orgId}`)
            return
        }
        const tmpData = [...recordedSchools]
        tmpData.push({
            orgId: values.orgId,
            name: dataRecord.Name,
            address: dataRecord.MailingAddress,
            cityStateZip: dataRecord.MailingCity + ' ' + dataRecord.MailingState + ', ' + dataRecord.MailingZip,
            gradeRange: dataRecord.Grades.toString(),
            approvedCapacity: values.approvedCapacity
        })
        console.log(`listed school contains? ${recordedSchools.some(i => i.orgId === 'IS003')}`)
        setRecordedSchools(tmpData)
        console.log(`listed school contains? ${recordedSchools.some(i => i.orgId === 'IS003')}`)
        // pruneSource()
    }
    const deleteRow = async (id: number) => {
        //todo this will be a call to the server
        console.debug(`delete table row ${id}`)
        const tmpData = [...recordedSchools]
        tmpData.splice(id, 1)
        setRecordedSchools(tmpData)
    }

    useEffect(() => {
        // calling async functions to handle promises
        // populate the authoritative list of schools
        loadSourceSchools()
        loadRecordedSchools()
    }, []);

    useEffect(() => {
        if (sourceSchools.length == 0 || recordedSchools.length == 0) return;
        if (!markedClosedSchools.current) {
            console.log("marking any schools not in the source as closed")
            const srcIds = sourceSchools.map(({OrgID}) => OrgID)
            recordedSchools
                .filter(({orgId}) => !srcIds.includes(orgId || ''))
                .forEach(s => s.closed = true)
            markedClosedSchools.current = true;
        }
        const listedIds = recordedSchools.map(({orgId}) => orgId)
        setSchoolChoices(sourceSchools.filter(({OrgID}) => !listedIds.includes(OrgID)))
    }, [sourceSchools, recordedSchools]);
    const columnHelper = createColumnHelper<SchoolProfileStatus>()
    const cols =
        [
            columnHelper.accessor(row => row.name, {
                header: 'Name',
                cell: props => {
                    return (<span
                        className={props.row.original.closed ? 'text-decoration-line-through' : ''}>{props.row.original.closed}{`${props.row.original.orgId} ${props.getValue()}`}</span>)
                }
            }),
            columnHelper.accessor(row => row.approvedCapacity, {
                header: 'Approved Capacity',
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
    const renderOptions = () => {
        console.log(`rendered ${schoolChoices.length} options`)
        if (schoolChoices.length == 0) return <option>loading...</option>
        return schoolChoices.map(o =>
            <option value={o.OrgID} key={o.OrgID}>{o.Name}</option>
        );
    }
    return (
        <Formik onSubmit={addSchool}
                initialValues={{
                    orgId: '',
                    approvedCapacity: 0
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
                                            <Form.Label>Schools</Form.Label>
                                            <Field name="orgId"
                                                   as={Form.Select}
                                                   required
                                            >
                                                <option hidden value=''>Choose a School</option>
                                                {renderOptions()}
                                            </Field>
                                        </Col>
                                        <Col sm={2}>
                                            <Form.Label>Approved Capacity</Form.Label>
                                            <Field as={"input"}
                                                   className={"form-control"}
                                                   name="approvedCapacity"
                                                   placeholder={0}
                                                   type="number"
                                                   required
                                            />
                                        </Col>
                                    </Form.Group>
                                </Card.Body>
                                <Card.Footer>
                                    <Button type={"submit"}>Add</Button>
                                </Card.Footer>
                            </Card>
                            <RateApplicationTable columns={cols} data={recordedSchools}/>
                        </Form>
                    </>
                )
            }
        </Formik>
    );
}

export default Schools