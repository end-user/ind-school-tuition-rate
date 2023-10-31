import {Card, Form} from "react-bootstrap";
import {FormikProvider, useFormik} from "formik";
import React from "react";
import {boolean, object} from "yup";

const validationSchema = object().shape({assured: boolean().oneOf([true], "Please read and confirm.")})
const Assurances = ({assurancesConfirm}: { assurancesConfirm: React.MutableRefObject<boolean | undefined> }) => {
    const initialValues = {assured: false}
    const setAssure = async () => {
        assurancesConfirm.current = !formik.values.assured
        await formik.setFieldTouched('assured', true)
        await formik.setFieldValue('assured', !formik.values.assured)
        await formik.validateField('assured')
        //&& formik.touched.assured && !!formik.errors.assured
    }
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: v => {
            v
        },
        validationSchema: validationSchema,
        enableReinitialize: true
    })
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
                <FormikProvider value={formik}>
                    <Form>
                        <div className={'card col-5 offset-4 alert alert-primary'}>
                            <div className={'card-body'}>
                                <Form.Check id={'assured'} type={'checkbox'}>
                                    <Form.Check.Input
                                        isInvalid={assurancesConfirm.current === false }
                                        onChange={setAssure}/>
                                    <Form.Check.Label>I have read and understand these assurances.</Form.Check.Label>
                                    <Form.Control.Feedback type={"invalid"}>
                                        Please read <i>Assurances</i> and confirm you've read and understand
                                    </Form.Control.Feedback>
                                </Form.Check>
                            </div>
                        </div>
                    </Form>
                </FormikProvider>
            </Card.Body>
        </Card>
    );
}

export default Assurances