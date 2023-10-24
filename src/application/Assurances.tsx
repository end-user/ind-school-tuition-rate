import {Alert, Card, Form} from "react-bootstrap";
import {Formik} from "formik";
import React from "react";

const Assurances = ({assurancesConfirm}: { assurancesConfirm: React.MutableRefObject<boolean> }) => {
    const initialValues = {assured: assurancesConfirm.current}
    const setAssure = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        console.log(`new value ${value}`)
        assurancesConfirm.current = !assurancesConfirm.current
    }
    return (
        <Card>
            <Card.Header>Tuition Rate Assurances</Card.Header>
            <Card.Body>
                <p>The following assurances officially notify heads of independent that Agency of Education official
                    tuition rates have been approved for the 2023 – 2024 school year, by the Agency of Education’s Rate
                    Setting Committee, as per Vermont State Board Rule 2232. Additionally, by signing assurance page,
                    the head of school, confirms and agrees that:
                </p>
                <p><strong>2225.1</strong> Tuition for Independent Schools in Vermont. Tuition shall not be
                    paid from public funds to any independent elementary or secondary school in Vermont unless the
                    school
                    satisfies the requirements in SBE Rule 2226 (Application), SBE Rule 2227 (Approval), and SBE
                    Rule 2229 (Approval to Receive Public Tuition, Special Education Tuition).
                </p>
                <p><strong>2229 Approval to Receive Public Tuition</strong>
                </p>
                <p><strong>Special Education Approval. 2229.1 </strong> --Enrollment
                    Requirements for Approved Independent Schools, Students, and LEAs. a) Each approved
                    independent school shall publish, maintain and follow a written enrollment policy which, at minimum,
                    shall provide the following: 1) That the student or the parent of a student seeking to attend the
                    approved independent school shall voluntarily submit an application; 2) Any special considerations
                    or
                    requirements for a student’s acceptance for enrollment, none of which shall disadvantage a
                    student based on the student’s membership in a protected class, the student’s actual or suspected
                    disability, or the student’s socioeconomic status; 3) The school’s process for making
                    enrollment decisions when the number of applicants exceeds capacity.
                </p>
                <p><strong>2232 Tuition Rate Applications </strong>
                    Heads of School confirm that all “reported costs shall be only those that are net of other
                    available restricted revenue sources.”
                    There is no duplication of costs, in any cost category, on the tuition rate application
                    Off-setting revenues have been accurately reported, for transparency purposes only, and the
                    school may be required to provide financial verification of reporting at the discretion of the
                    Secretary of Education or the State Board of Education
                    The Head of School confirms if School Name has any additional businesses owned and operated
                    by owners of the school, they are wholly separate operationally, financially and employ
                    separate staff.
                </p>

                <Formik enableReinitialize
                        onSubmit={() => {
                        }}
                        initialValues={initialValues}
                >
                    {
                        ({handleChange}) => (
                            <>
                                <Form>
                                    <div className={'card col-5 offset-4 alert alert-primary'}>
                                        <div className={'card-body'}>
                                            <Form.Check type={'checkbox'}
                                                        name={'assured'}
                                                        value={0}
                                                        id={'assurancesConfirm'}>
                                                <Form.Check.Input  onChange={e=> {
                                                    handleChange(e)
                                                    setAssure(e)
                                                }} type={'checkbox'}/>
                                                <Form.Check.Label>I have read and understand these
                                                    assurances.</Form.Check.Label>
                                            </Form.Check>
                                            <Alert variant={"danger"} show={assurancesConfirm.current}  className={"col-4"}>
                                                <Alert.Heading>Incomplete</Alert.Heading>
                                                you didn't check the
                                                box. Please go back
                                                to <i>Assurances</i> and confirm you've read and understand
                                            </Alert>
                                        </div>
                                    </div>
                                </Form>
                            </>
                        )}
                </Formik>

            </Card.Body></Card>
    );
}

export default Assurances