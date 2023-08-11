import React, { useState } from 'react'
import { Button, Modal, Form, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import Icon from '@mdi/react'
import {
  mdiAlertBoxOutline,
  mdiMagnify,
  mdiTimerSand,
  mdiCheckboxMarkedCircle,
} from '@mdi/js'
import * as yup from 'yup'
import { Formik, Field } from 'formik'
import axios from 'axios'
import SurveyUpdateModalPermField from './SurveyUpdateModalPermField'

// This Modal appears ONLY when there is no PERM number attached to the selected row in the SurveyList component.

export default function SurveyUpdateModal({
  showSurveyUpdateModal,
  toggleModal,
  surveyInitialVals,
}) {
  const { firstName, lastName, birthDate, sex, id } = surveyInitialVals
  const [modalState, setModalState] = useState('inactive')
  const [modalMessage, setModalMessage] = useState('No Matching PERM Number')
  let history = useNavigate()
  const submitSurveyUpdate = async (data) => {
    setModalState('searching')
    setModalMessage('Searching...')
    try {
      let result = await axios.put(`/survey/${id}`, data)
      if (result.status === 200) {
        setModalState('success')
        setModalMessage('Student found. PERM number added to student record')
        setTimeout(() => {
          history.push(`/form/${id}`)
        }, 1500)
      }
    } catch (error) {
      setModalState('failure')
      setModalMessage('No Student Found. Try again.')
    }
  }
  // Quick and light schema enforcement, as the point is to allow for the fields to be editable.
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    birthDate: yup.date().required(),
    sex: yup.string().required(),
  })

  const determineIcon = () => {
    switch (modalState) {
      case 'inactive':
        return <Icon path={mdiAlertBoxOutline} color="red" size={1.5} />
      case 'searching':
        return (
          <Icon
            path={mdiTimerSand}
            size={1.5}
            color={'blue'}
            className={'icon-vertical-center'}
          />
        )
      case 'success':
        return (
          <Icon
            path={mdiCheckboxMarkedCircle}
            size={1.5}
            color={'green'}
            className={'icon-vertical-center'}
          />
        )
      case 'failure':
        return (
          <Icon
            path={mdiAlertBoxOutline}
            size={1.5}
            color={'red'}
            className={'icon-vertical-center'}
          />
        )
    }
  }

  return (
    <Modal show={showSurveyUpdateModal} onHide={toggleModal} size="lg">
      <Modal.Header closeButton>
        <div className="d-flex flex-column">
          <Modal.Title>
            {determineIcon()}
            {modalMessage}
          </Modal.Title>
          <span>Update survey information to reattempt search:</span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={submitSurveyUpdate}
          initialValues={{
            firstName: firstName,
            middleName: '',
            lastName: lastName,
            birthDate: birthDate,
            sex: sex,
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="firstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {'*required'}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="lastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {'*required'}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="birthDate">
                  <Form.Label>DOB</Form.Label>
                  <Form.Control
                    type="date"
                    name="birthDate"
                    value={values.birthDate}
                    onChange={handleChange}
                    isInvalid={!!errors.birthDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {'*required'}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="3"
                  controlId="sex"
                  className="d-flex"
                  value={values.sex}
                  id="sex"
                  error={errors.sex}
                >
                  <Form.Label>Sex</Form.Label>
                  <label
                    className="d-flex flex-row justify-content-center align-items-center m-2"
                    isInvalid={!!errors.sex}
                  >
                    <Field
                      className="radio-size"
                      type="radio"
                      name="sex"
                      value="M"
                    />
                    <span className="radio-size pl-1">M</span>
                  </label>
                  <label className="d-flex flex-row justify-content-center align-items-center m-2">
                    <Field
                      className="radio-size"
                      type="radio"
                      name="sex"
                      value="F"
                      isInvalid={!!errors.sex}
                    />
                    <span className="radio-size pl-1">F</span>
                  </label>
                  <Form.Control.Feedback type="invalid">
                    {errors.sex}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button type="submit">
                Search
                <Icon
                  path={mdiMagnify}
                  className="pr-1"
                  color="white"
                  size={1}
                />
              </Button>
            </Form>
          )}
        </Formik>
        <SurveyUpdateModalPermField id={id} />
      </Modal.Body>
    </Modal>
  )
}
