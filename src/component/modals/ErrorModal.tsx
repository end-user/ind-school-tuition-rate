import React from "react";
import { Modal, Container, Row } from 'react-bootstrap'
import Icon from '@mdi/react'
import { mdiAlertBoxOutline } from '@mdi/js'

function ErrorModal({ closeErrorModal, errorResponse, isError }) {

    return (
        <Modal
            show={isError}
            keyboard={false}
            centered
            onHide={closeErrorModal}
        >
            <Modal.Title>
                <Container fluid>
                    <Row className="justify-content-md-center">
                        <div className={"p-1"}>Oops! Something has gone wrong</div>
                        < Icon className={"icon-vertical-center"} path={mdiAlertBoxOutline} size={1} color="red" />
                        <span className="alert-danger">{`${errorResponse.name} : ${errorResponse.message}`}</span>
                    </Row >
                </Container>
            </Modal.Title>

        </Modal>
    );
}


export default ErrorModal;