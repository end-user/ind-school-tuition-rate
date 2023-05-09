import React, { useState } from "react";
import { Modal, Container, Row, Button } from 'react-bootstrap'
import axios from 'axios'


function DeleteSurveyModal({ setShowDeleteSurveyModal, showDeleteSurveyModal, responseId }) {

    const deleteSurvey = async (e) => {

        try {
            setDisableButtons(true)
            let result = await axios.put(`/archive/${responseId}`)
            if (result.status !== 200) {
                setDisableButtons(false)
                alert("survey could not be deleted ")
            } else {
                alert("survey successfully deleted!")
                setDisableButtons(false)
            }
            setShowDeleteSurveyModal(false)
            window.location.reload()

        } catch (error) {
            alert("survey could not be deleted")
            console.error(error)
            setDisableButtons(false)
        }
    }

    const closeModal = (e) => {
        setShowDeleteSurveyModal(false)

    }

    const [disableButtons, setDisableButtons] = useState(false)
    return (
        <Modal
            show={showDeleteSurveyModal}
            keyboard={false}
            centered
        >

            <Container fluid className="p-2">
                <Row className="justify-content-md-center">
                    <div className={"p-1 text-center"}>Are you sure you want to remove this survey ({responseId}) from the list?</div>

                </Row >
                <Row className="justify-content-md-center">
                    <Button variant="primary" disabled={disableButtons}
                        className="mr-4" onClick={deleteSurvey}>Yes</Button> <Button disabled={disableButtons}
                            onClick={closeModal} variant="secondary">No</Button>
                </Row >
            </Container>

        </Modal>
    );
}


export default DeleteSurveyModal;