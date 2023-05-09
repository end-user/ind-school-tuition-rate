import React from "react";
import { Modal, Container, Row } from 'react-bootstrap'
import Icon from '@mdi/react'
import { mdiAlertBoxOutline, mdiTimerSand } from '@mdi/js'

function ErrorModal({ closeSearchingModal, showSearchingModal, searchingModalMessage }) {

    const determineIcon = () => {
        switch (searchingModalMessage) {
            case "Searching...":
                return <Icon path={mdiTimerSand} size={1} color={"blue"} className={"icon-vertical-center"} />

            case "No survey found":
                return <Icon path={mdiAlertBoxOutline} size={1} color={"red"} className={"icon-vertical-center"} />
        }
    }

    
    return (
        <Modal
            show={showSearchingModal}
            keyboard={false}
            centered
            onHide={closeSearchingModal}
        >
            <Modal.Title>
                <Container fluid>
                    <Row className="justify-content-md-center">
                        {determineIcon()}
                        <div className={"p-1"}>{searchingModalMessage}</div>
                    </Row >
                </Container>
            </Modal.Title>

        </Modal>
    );
}


export default ErrorModal;