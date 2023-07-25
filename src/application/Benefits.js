import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import React, {useState} from "react";
import {Field, Formik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle, faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import RateApplicationTable from "../shared/RateApplicationTable";
import {currencyFormatter} from "../services/formatter";
import {Tooltip} from "react-tippy";

const Benefits = ({data, setData}) => {
    const deleteRow = async (id) => {
        //todo this will be a call to the server
        console.debug(`delete table row ${id}`)
        const tmpData = [...data]
        tmpData.splice(id, 1)
        setData(tmpData)
    }
    const addRow = async (values) => {
        console.debug('got: ', values)
        const tmpData = [...data]
        tmpData.push(values)
        setData(tmpData)
        const tmpOptions = [...options].filter(o => {
            return o !== values.benefit
        })
        console.debug(tmpOptions)
        setOptions(tmpOptions)
    };
    const [options, setOptions] = useState([
        'FICA',
        'Workers\' Compensation',
        'Unemployment',
        'Group Health/Dental Insurance',
        'Group Life Insurance',
        'Disability Insurance',
        'Staff Liability Insurance',
        'Pension',
        'Profits Sharing',
        'Staff Professional Development (for all staff members)',
        'Employee Gifts/Awards/Banquets',

    ])

    const cols = [{
        Header: 'Benefit',
        accessor: 'benefit', // accessor is the "key" in the data
    }, {
        Header: 'FY22 Actual',
        accessor: 'actual',
        Cell: ({value}) => currencyFormatter.format(value)
    }, {
        Header: 'FY23 Budget',
        accessor: 'budget',
        Cell: ({value}) => currencyFormatter.format(value)
    }, {
        Header: '',
        id: 'delete',
        accessor: 'delete',
        Cell: (tableProps) => (
            <Button variant={'link'} className={'text-success'} onClick={() => deleteRow(tableProps.row.index)}>
                <FontAwesomeIcon icon={faSquareXmark}/>
            </Button>),
    },]

    const onSelect = (value) => {
        console.log('onselect', value)
    }
    return (<Formik enableReinitialize
                    onSubmit={addRow}
                    initialValues={{'benefit': '', 'actual': 0, 'budget': 0}}
        >
            {({
                  handleChange,
                  handleSubmit,
              }) => (<>
                    <Form onSubmit={handleSubmit}>
                        <Card>
                            <Card.Body className={'bg-info text-dark bg-opacity-10'}>
                                <Form.Group as={Row}>
                                    <Col sm={4}>
                                        <Form.Label>Benefit</Form.Label>
                                        <Tooltip
                                            position="right"
                                            trigger="click"
                                            html={(
                                                <div className="col-8 card border-dark">
                                                    <div className={'card-body'}>
                                                        <p>This is an example of some pop-up help text.</p>
                                                    </div>
                                                </div>
                                            )}
                                        > <FontAwesomeIcon icon={faQuestionCircle} className="text-success"/>
                                        </Tooltip>
                                        <Field name="benefit"
                                               as={Form.Select}
                                               required
                                        >
                                            <option hidden value=''>Choose a Benefit</option>
                                            {options.map(
                                                o => <option key={o}>{o}</option>
                                            )}
                                        </Field>

                                    </Col>
                                    <Col sm={2} className={'offset-sm-4'}>
                                        <Form.Label>FY22 Actual</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>$</InputGroup.Text>
                                            <Field as={"input"}
                                                   className={"form-control"}
                                                   name="actual"
                                                   type="number"
                                                   required
                                            />
                                        </InputGroup>
                                    </Col>
                                    <Col sm={2}>
                                        <Form.Label>FY23 Budget</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>$</InputGroup.Text>
                                            <Field as={"input"}
                                                   className={"form-control"}
                                                   name="budget"
                                                   type="number"
                                                   required
                                            />
                                        </InputGroup>
                                    </Col>
                                </Form.Group>
                            </Card.Body>
                            <Card.Footer>
                                <Button type={"submit"}>Add</Button>
                            </Card.Footer>
                        </Card>
                        <RateApplicationTable columns={cols} data={data}/>
                    </Form>
                </>
            )}
        </Formik>
    );
}
export default Benefits