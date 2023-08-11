import React, { useState, useEffect } from "react"
import { Button, Modal, Form, Col } from "react-bootstrap";
import { mdiAlertBoxOutline } from '@mdi/js'
import Icon from '@mdi/react'
import { Formik, Field } from 'formik'

const LoginModal = (props) => {
    const [loginFailed, setLoginFailed] = useState(false)
    const { show, toggleModal, setUserAuth, setModalShown } = props;

    useEffect(() => {
        setLoginFailed(false)
    }, [show])

    const submitLogIn = (data) => {
        //simulated authentication
        if (data.userName === "admin" && data.password === "password") {
            setUserAuth(true)
            localStorage.setItem('userAuth', true)
            setModalShown(false)
        }
        else {
            setLoginFailed(true)
        }
    }

    

    return (


        <Modal centered show={show} onHide={toggleModal} >
            <Modal.Header closeButton>
                <div className="d-flex flex-column">
                    {loginFailed ?
                        <div className="d-flex flex-column">
                            <Modal.Title> <Icon path={mdiAlertBoxOutline} color="red" size={2} />Login Failed</Modal.Title>
                            <span>Incorrect username or password</span>
                        </div>
                        :
                        <Modal.Title> Please log in</Modal.Title>
                    }
                </div>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    onSubmit={submitLogIn}
                    initialValues={{
                        userName: '',
                        password: ''
                    }
                    }
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="userName">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="userName"
                                        value={values.userName}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Button type="submit">Log in</Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal >

    );
}
export default LoginModal;