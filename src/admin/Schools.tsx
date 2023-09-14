import {Button, Card, Col, Form, Row,} from "react-bootstrap";
import {useEffect, useState} from "react";
import SchoolProvider, {School} from "../services/school-provider";
import {Field, Formik} from "formik";
import RateApplicationTable from "../shared/RateApplicationTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import {createColumnHelper} from "@tanstack/react-table";
import {SchoolProfile} from "../shared/ts-model-data.ts";
import {mockSchoolList} from "../shared/mock-data.ts";

type SchoolProfileStatus = SchoolProfile & { closed?: boolean }
const Schools = () => {

    const crossMatch = ([sourceSchools, listedSchools]: [School[], SchoolProfileStatus[]]) => {

        console.log("called crossMatch", (sourceSchools === undefined || sourceSchools.length == 0), (listedSchools === undefined || listedSchools.length == 0))
        //
        return
        if ((sourceSchools === undefined || sourceSchools.length == 0) || (listedSchools === undefined || listedSchools.length == 0)) return
        const _srcIds = sourceSchools.map(({OrgID}) => OrgID)
        const _listIds = listedSchools.map(({orgId}) => orgId)
        setSourceSchools(sourceSchools.filter(({OrgID}) => !_listIds.includes(OrgID)))

        listedSchools
            .filter(({orgId}) => !_srcIds.includes(orgId || ''))
            .forEach(s => s.closed = true)
        setListedSchools(listedSchools)
        console.log("source schools", _srcIds)
        console.log("listed schools", _listIds)
    }
    const addSchool = (values: SchoolProfile) => {
        console.log(values)
        const tmpData = [...listedSchools]
        tmpData.push(values)
        setListedSchools(tmpData)
    }
    const deleteRow = async (id: number) => {
        //todo this will be a call to the server
        console.debug(`delete table row ${id}`)
        const tmpData = [...listedSchools]
        tmpData.splice(id, 1)
        setListedSchools(tmpData)
    }
    // from the application
    const [listedSchools, setListedSchools] =
        useState<(SchoolProfile & { closed?: boolean })[]>([])

    // from the API
    const [sourceSchools, setSourceSchools] =
        useState<(School)[]>([])
    // if (sourceSchools === undefined || sourceSchools.length == 0) {
    //     SchoolProvider.getSchools()
    //         .then((_schools) => setSourceSchools(_schools))
    // }
    useEffect(() => {
        // setSourceSchools([])
        Promise.allSettled([
            SchoolProvider.getSchools()
                .then((schools) => {
                    console.log("got source", schools)
                    return schools
                    // setSourceSchools(_schools)
                }),
            (async () => mockSchoolList)()
                .then((selected) => {
                    console.log("got list", selected)
                    return selected
                    // setListedSchools(_list)
                })

        ]).then((values) => {
            const fulfilledValues = (values as PromiseFulfilledResult<School | SchoolProfileStatus>[])
                .filter(res => res.status === 'fulfilled')
                .map(res => res.value);

            crossMatch(fulfilledValues as [School[], SchoolProfileStatus[]])
        })
    }, [sourceSchools,listedSchools]);

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
        <Formik onSubmit={addSchool}
                initialValues={{
                    name: ''
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
                                            <Field name="name"
                                                   as={Form.Select}
                                                   required
                                            >
                                                <option hidden value=''>Choose a School</option>
                                                {sourceSchools?.map(
                                                    o => (<option key={o.Name}>{o.Name}</option>)
                                                )}
                                            </Field>
                                        </Col>
                                    </Form.Group>
                                </Card.Body>
                                <Card.Footer>
                                    <Button type={"submit"}>Add</Button>
                                </Card.Footer>
                            </Card>
                            <RateApplicationTable columns={cols} data={listedSchools}/>
                        </Form>
                    </>
                )
            }
        </Formik>
    );
}

export default Schools