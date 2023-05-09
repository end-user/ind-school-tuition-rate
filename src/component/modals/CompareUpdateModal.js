import React from 'react'
import { Modal, Container, Row } from 'react-bootstrap'
import Icon from '@mdi/react'
import {
  mdiCheckboxMarkedCircle,
  mdiLoading,
  mdiAlertBoxOutline,
} from '@mdi/js'

function CompareUpdateModal({
  isSubmitting,
  submitSuccessful,
  errorModalMessage,
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
              <div style={{ justifySelf: 'center' }}>Submit Successful!</div>
            </Row>
          </Container>
        ) : (
          <Container fluid>
            <Row className="justify-content-md-center flex-justify-align">
              {errorModalMessage ? (
                <>
                  <Icon path={mdiAlertBoxOutline} color="red" size={2} />
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

export default CompareUpdateModal
