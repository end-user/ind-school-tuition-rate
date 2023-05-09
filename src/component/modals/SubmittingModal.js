import React from 'react'
import { Modal, Container, Row } from 'react-bootstrap'
import Icon from '@mdi/react'
import {
    mdiCheckboxMarkedCircle,
    mdiLoading,
    mdiAlertBoxOutline,
} from '@mdi/js'
import { PDFDownloadLink } from '@react-pdf/renderer'
import SurveyPDFTemplate from '../survey/assets/SurveyPDFTemplate'

function SubmittingModal({
    isSubmitting,
    submitSuccessful,
    errorModalMessage,
    showPDFLink,
    data,
    close,
}) {
    return (
        <Modal show={isSubmitting} backdrop="static" keyboard={false} centered>
            <Modal.Title className="p-3">
                {submitSuccessful ? (
                    <Container fluid>
                        <Row className="justify-content-md-center flex-justify-align">
                            <Icon
                                className={'icon-vertical-center'}
                                path={mdiCheckboxMarkedCircle}
                                size={1}
                                color="green"
                            />
                            <div style={{ justifySelf: 'center' }}>
                                Submit Successful! Save a copy as PDF?
                            </div>
                        </Row>
                        <Row className="justify-content-md-center flex-justify-align">
                            {data !== null ? (
                                <>
                                    <PDFDownloadLink
                                        className="text-center btn btn-outline-secondary justify-content-center"
                                        document={
                                            <SurveyPDFTemplate data={data} />
                                        }
                                        fileName="home_language_survey.pdf"
                                    >
                                        {({ blob, url, loading, error }) =>
                                            loading
                                                ? 'Loading document...'
                                                : 'Download PDF'
                                        }
                                    </PDFDownloadLink>
                                    <div
                                        className="text-center btn"
                                        onClick={close}
                                    >
                                        Close
                                    </div>
                                </>
                            ) : (
                                <span></span>
                            )}
                        </Row>
                    </Container>
                ) : (
                    <Container fluid>
                        <Row className="justify-content-md-center flex-justify-align">
                            {errorModalMessage ? (
                                <>
                                    <Icon
                                        path={mdiAlertBoxOutline}
                                        color="red"
                                        size={2}
                                    />
                                    <div>{errorModalMessage}</div>
                                </>
                            ) : (
                                <>
                                    <Icon
                                        className={'icon-vertical-center'}
                                        path={mdiLoading}
                                        size={1}
                                        color=" blue"
                                        spin
                                    />
                                    <div>Submitting...</div>
                                </>
                            )}
                        </Row>
                    </Container>
                )}
            </Modal.Title>
        </Modal>
    )
}

export default SubmittingModal
