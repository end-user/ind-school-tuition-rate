import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Field, Formik} from "formik";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faQuestionCircle, faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import RateApplicationTable from "../shared/RateApplicationTable";
import {currencyFormatter} from "../services/formatter.js";
import {Tooltip} from "react-tippy";
import {createColumnHelper} from "@tanstack/react-table";
import {Benefit} from "../shared/ts-model-data.ts";
import FY from "../shared/FY.tsx";

const Benefits = ({fy, data, setData}: {
    fy: FY,
    data: Benefit[],
    setData: React.Dispatch<React.SetStateAction<Benefit[]>>
}) => {
    const columnHelper = createColumnHelper<Benefit>()
    const [selectedOption, setSelectedOption] = useState("");
    const initOptions: string[] = [
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
        'Other'
    ]
    const [benefitOptions, setBenefitOptions] = useState<string[]>([])
    const [editCommentRowId, setCommentRowId] = useState<number>()
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value: string = event.target.value
        setSelectedOption(value);
    };
    const deleteRow = async (id: number) => {
        //todo this will be a call to the server
        console.log(`delete table row ${id}`)
        const tmpData = [...data]
        tmpData.splice(id, 1)
        setData(tmpData)
    }
    const addRow = async (values: Benefit) => {
        const tmpData = [...data]
        tmpData.push(values)
        setData(tmpData)
        if (values.benefit === "Other") return
        setBenefitOptions(benefitOptions.filter(o => o !== values.benefit))
    };
    const editComment = (id: number) => {
        setCommentRowId(id)
    }
    //const user = GetUserPrincipal()
    const user = {isStateEmployee: true}

    const initialValues: Benefit = {benefit: '', description: '', comment: '', actual: 0, budget: 0}
    const cols = [
        columnHelper.accessor(row => row.benefit, {
            id: 'benefit',
            header: 'Benefit',
        }),
        columnHelper.accessor(row => row.description, {
            id: 'description',
        }),
        columnHelper.accessor(row => row.actual, {
            id: 'actual',
            header: `FY${fy.this()} Actual`,
            cell: value => currencyFormatter.format(value.getValue() || 0)
        }),
        columnHelper.accessor(row => row.budget, {
            id: 'budget',
            header: `FY${fy.next()} Budget`,
            cell: value => currencyFormatter.format(value.getValue() || 0)
        }),
        columnHelper.display({
            id: 'actions',
            cell: (tableProps) => (<>
                {user.isStateEmployee && editCommentRowId !== tableProps.row.index && (
                    //only display the button if this is an admin
                    <Button variant={'link'} className={'text-success'}
                            hidden={editCommentRowId === tableProps.row.index}
                            onClick={() => {
                                console.log(`edit row ${tableProps.row.index}`)
                                editComment(tableProps.row.index)
                            }}>
                        <FontAwesomeIcon icon={faComments}/>
                    </Button>)}
                <Button variant={'link'} className={'text-success'} onClick={() => deleteRow(tableProps.row.index)}>
                    <FontAwesomeIcon icon={faSquareXmark}/>
                </Button>
            </>),
        })
    ]

    useEffect(() => {
        const usedOptions: (string | undefined)[] = data.map(b => {
            if (b.benefit !== "Other") return b.benefit
        })
        // const filteredOptions=
        setBenefitOptions(initOptions.filter(o => {
            if (!usedOptions.includes(o)) return o
        }))
    }, [data]);

    return (<Formik enableReinitialize
                    onSubmit={addRow}
                    initialValues={initialValues}
        >
            {({
                  handleSubmit,
                  handleChange
              }) => (<>
                    <Form onSubmit={handleSubmit}>

                        <Card>
                            <Card.Header>Rule 2232 (1) (K)</Card.Header>
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
                                               onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                   handleChange(e);
                                                   handleSelectChange(e)
                                               }}
                                               required
                                        >
                                            <option hidden value=''>Choose a Benefit</option>
                                            {benefitOptions.map(o => <option key={o}>{o}</option>)}
                                        </Field>

                                    </Col>
                                    <Col><Form.Group hidden={(selectedOption !== "Other")} controlId={"description"}>
                                        <Form.Label>Description</Form.Label>
                                        <Field as={Form.Control} name="description"/></Form.Group></Col>
                                    <Col sm={2}>
                                        <Form.Label>FY{fy.this()} Actual</Form.Label>
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
                                        <Form.Label>FY{fy.next()} Budget</Form.Label>
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
                        <RateApplicationTable<Benefit> columns={cols} data={data}
                                                       commentHandlers={{editCommentRowId, setCommentRowId}}
                        />
                    </Form>
                </>
            )}
        </Formik>
    );
}
export default Benefits