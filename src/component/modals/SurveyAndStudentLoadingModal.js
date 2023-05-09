import React from "react";
import { Modal, Container, Row, Popover, OverlayTrigger, Button } from 'react-bootstrap'
import Icon from '@mdi/react'
import { mdiAlertBoxOutline, mdiLoading } from '@mdi/js';
import { useParams } from 'react-router-dom'

function SurveyAndStudentLoadingModal({ errorMessage, show, gettingSurvey, gettingStudent, errorReceived }) {

    const { id } = useParams()
    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Title className="p-3" >

                {(gettingSurvey && !gettingStudent) ?
                    <Container fluid>
                        <Row className="justify-content-md-center">
                            <div>Getting Survey...</div>
                            < Icon className={"icon-vertical-center"} path={mdiLoading} size={1} color=" blue" spin />
                        </Row >
                    </Container>
                    : null}
                {gettingStudent ?
                    <Container fluid>
                        <Row className="justify-content-md-center">
                            <div>Getting Student...</div>
                            < Icon className={"icon-vertical-center"} path={mdiLoading} size={1} color=" blue" spin />
                        </Row >
                    </Container>

                    : null}
                {errorReceived ?
                    <Container fluid>
                        <Row className="justify-content-md-center">
                            <div>Oops! Something has gone wrong.</div>
                            < Icon className={"icon-vertical-center"} path={mdiAlertBoxOutline} size={1} color="red" />
                            <span className="small text-center alert-warning">{`Most likely, the provided survey (ID: ${id} )is not in our records`}</span>
                            <OverlayTrigger
                                trigger="click"
                                key={'bottom'}
                                placement={'bottom'}
                                overlay={
                                    <Popover id={`popover-positioned-${'bottom'}`}>
                                        <Popover.Title as="h3"></Popover.Title>
                                        <Popover.Content>
                                            <span className="alert-danger text-center">{`${errorMessage.name} : ${errorMessage.message}`}</span>
                                        </Popover.Content>
                                    </Popover>
                                }
                            >
                                <Button variant="secondary">Details</Button>
                            </OverlayTrigger>
                        </Row >
                    </Container> : null}
            </Modal.Title>
        </Modal >
    );
}


export default SurveyAndStudentLoadingModal;