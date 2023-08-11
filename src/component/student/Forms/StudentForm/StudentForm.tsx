import React, {useEffect, useState} from 'react'
import {Button, Col, FormFeedback, FormGroup, Input, Label, Row,} from 'reactstrap'
import {Field, Form, Formik} from 'formik'
import Select, {createFilter} from 'react-select'
import axios from 'axios'
import FormikRadio from './FormikRadio'
import Tooltip from './Tooltip'
import LanguageDropDown from './LanguageDropdown'
import formatContextArray from '../../../../functions/formatContextArray'
import CompareUpdateModal from '../../../modals/CompareUpdateModal'

const StudentForm = ({student}) => {
  const grades = [
    {value: 'PreK', label: 'PreK'},
    {value: 'K', label: 'K'},
    {value: '01', label: '1'},
    {value: '02', label: '2'},
    {value: '03', label: '3'},
    {value: '04', label: '4'},
    {value: '05', label: '5'},
    {value: '06', label: '6'},
    {value: '07', label: '7'},
    {value: '08', label: '8'},
    {value: '09', label: '9'},
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
  ]
  const submitForm = (values) => {
    let formatted = formatValues(values)
    setSubmitSuccessful(false)
    try {
      setIsSubmitting(true)
      axios.put(`/student/${values.permNumber}`, formatted).then((response) => {
        if (response.status == 200) {
          setSubmitSuccessful(true)
          setTimeout(() => {
            setIsSubmitting(false)
            setSubmitSuccessful(false)
          }, 2000)
        }
      })
    } catch (error) {
      setErrorModalMessage(error.message)
      setTimeout(() => {
        setIsSubmitting(false)
      }, 2000)
    }
  }
  const formatValues = (value) => {
    let contextArray = formatLanguageContexts(value)
    let obj = {
      birthDate: value.birthDate,
      countryOfBirth: {
        code: value.countryOfBirth.value,
        name: value.countryOfBirth.label,
      },
      enrollingAt: value.enrollingAt.value,
      firstName: value.firstName,
      lastName: value.lastName,
      firstUSEnrollmentDate: value.firstUSEnrollmentDate,
      firstVtEnrollmentDate: value.firstVtEnrollmentDate,
      gradeEntering: value.gradeEntering.value,
      languageContexts: contextArray,
      permNumber: value.permNumber,
      sex: value.sex,
      surveyReceived: value.surveyReceived,
      usEntryDate: value.usEntryDate,
    }
    return { student: obj, surveyId: null }
  }
  const formatLanguageContexts = (values) => {
    let formatArray = []
    if (values.favored) {
      values.favored.map((lang) => {
        formatArray.push({
          context: {
            id: 5,
            context: "child's most frequently used language",
            priority: 1,
            disabled: false,
          },
          language: { code: lang.value, language: lang.label },
          pk: {},
        })
      })
    }
    if (values.firstLearned) {
      values.firstLearned.map((lang) => {
        formatArray.push({
          context: {
            id: 4,
            context: "child's first spoken language",
            priority: 2,
            disabled: false,
          },
          language: { code: lang.value, language: lang.label },
          pk: {},
        })
      })
    }
    if (values.parentLanguages) {
      values.parentLanguages.map((lang) => {
        formatArray.push({
          context: {
            id: 1,
            context: 'native language of parent',
            priority: 2,
            disabled: false,
          },
          language: { code: lang.value, language: lang.label },
          pk: {},
        })
      })
    }
    if (values.spokenInHome) {
      values.spokenInHome.map((lang) => {
        formatArray.push({
          context: {
            id: 3,
            context: 'language spoken at home',
            priority: 4,
            disabled: false,
          },
          language: { code: lang.value, language: lang.label },
          pk: {},
        })
      })
    }
    if (values.usedMostOftenWithChild) {
      values.usedMostOftenWithChild.map((lang) => {
        formatArray.push({
          context: {
            id: 6,
            context: 'language most frequently spoken to child',
            priority: 3,
            disabled: false,
          },
          language: { code: lang.value, language: lang.label },
          pk: {},
        })
      })
    }
    return formatArray
  }

  const [countries, setCountries] = useState()
  const [languages, setLanguages] = useState()
  const [schools, setSchools] = useState()
  const [schoolLabel, setSchoolLabel] = useState()
  const [gradeLabel, setGradeLabel] = useState()
  const [isoLanguages, setIsoLanguages] = useState()
  const [valueObj, setValueObj] = useState(student)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccessful, setSubmitSuccessful] = useState(false)
  const [errorModalMessage, setErrorModalMessage] = useState('')
  useEffect(() => {
    try {
      axios.get('/public/countries').then((response) => {
        const countries = response.data.map((c) => ({
          value: c.code,
          label: c.name,
        }))
        setCountries(countries)
      })
      axios.get('/public/schools').then((response) => {
        const schools = response.data.map((s) => ({
          value: s.stateId,
          label: s.name,
        }))
        setSchools(schools)
        let label = schools.filter((school) => {
          return school.value == student.enrollingAt
        })
        if (label.length > 0) {
          setSchoolLabel(label[0].label)
        } else {
          setSchoolLabel('None Selected')
        }
      })
      axios.get('/public/languages').then(
        (langResponse) => {
          const languages = langResponse.data.map((l) => ({
            value: l.code, //l.id,
            label: l.language + ' (' + l.code + ')',
          }))
          setLanguages(languages)
          return languages
        },
        (error) => {
          console.error(error)
        }
      )
      axios.get('/public/ISO_639-3').then(
        (langResponse) => {
          let languages = langResponse.data.map((l) => ({
            value: l.id, //l.id,
            label: l.name + ' (' + l.id + ')',
          }))
          setIsoLanguages(languages)
          return languages
        },
        (error) => {
          console.error(error)
        }
      )

      let gradeLabel = grades.filter((grade) => {
        return grade.value == student.gradeEntering
      })
      if (gradeLabel) {
        setGradeLabel(gradeLabel[0].label)
      } else {
        setGradeLabel('None Selected')
      }
    } catch (error) {
      console.error(error)
    }
  }, [])
  //unpacks student object into Form
  // Broken into individual components
  useEffect(() => {
    try {
      if (student.languageContexts) {
        let { languageContexts, ...restOfStudent } = student
        languageContexts = formatContextArray(languageContexts)
        restOfStudent.parentLanguages = languageContexts[1]
        restOfStudent.spokenInHome = languageContexts[3]
        restOfStudent.firstLearned = languageContexts[4]
        restOfStudent.usedMostOftenWithChild = languageContexts[5]
        restOfStudent.favored = languageContexts[6]
        restOfStudent.countryOfBirth = {
          value: restOfStudent.countryOfBirth.code,
          label: restOfStudent.countryOfBirth.name,
        }
        restOfStudent.enrollingAt = {
          value: restOfStudent.enrollingAt,
          label: schoolLabel,
        }
        restOfStudent.gradeEntering = {
          value: restOfStudent.gradeEntering,
          label: gradeLabel,
        }

        if (student.homeLanguageCode) {
          restOfStudent.specificLanguage = {
            value: student.homeLanguageCode.code,
            label: `${student.homeLanguageCode.language} (${student.homeLanguageCode.code})`,
          }
        }

        setValueObj(restOfStudent)
      }
    } catch (error) {
      console.error(error)
    }
  }, [student, schoolLabel, gradeLabel])

  return (
    <>
      <h5 className="text-center mb-0 p-2">Edit Student</h5>
      <hr />
      <h6 className="alert-info col-12 text-center p-2">
        Make edits to the student's information below.
      </h6>
      {student != undefined ? (
        <>
          <Formik
            initialValues={valueObj}
            //validationSchema={formConfig.validationSchema}
            onSubmit={submitForm}
            enableReinitialize={true}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <FormGroup row>
                      <Col sm={12}>
                        <Label htmlFor="firstname">First Name</Label>
                        <Input
                          tag={Field}
                          type="text"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                        />
                        <FormFeedback>{errors.firstName}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm={12}>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          tag={Field}
                          type="text"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                        />
                        <FormFeedback>{errors.lastName}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm={12}>
                        <Label htmlFor="permNumber">PERM Number</Label>
                        <Input
                          tag={Field}
                          type="text"
                          name="permNumber"
                          value={values.permNumber}
                          onChange={handleChange}
                        ></Input>
                        <FormFeedback>{errors.select}</FormFeedback>
                      </Col>
                    </FormGroup>
                    {/* Radio Buttons */}
                    <FormGroup tag="fieldset">
                      <Label htmlFor="sex">Gender</Label>
                      <div style={{ color: errors.sex ? '#dc3545' : null }}>
                        <FormikRadio
                          name="sex"
                          type="radio"
                          value="F"
                          label="Female"
                        />
                        <FormikRadio
                          name="sex"
                          type="radio"
                          value="M"
                          label="Male"
                        />
                        <div
                          style={{
                            color: '#dc3545',
                            fontSize: '80%',
                            marginTop: '.25rem',
                          }}
                        >
                          {errors.sex}
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm={12}>
                        <Label htmlFor="birthDate">Date of Birth</Label>
                        <Input
                          tag={Field}
                          type="date"
                          name="birthDate"
                          value={values.birthDate}
                          onChange={handleChange}
                        />
                        <FormFeedback>{errors.birthDate}</FormFeedback>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col sm={12}>
                        <Label htmlFor="countryOfBirth">Country of Birth</Label>
                        <Select
                          options={countries}
                          isMulti={false}
                          filterOption={createFilter({ matchFrom: 'start' })}
                          closeMenuOnSelect={true}
                          value={
                            values.countryOfBirth ? values.countryOfBirth : ''
                          }
                          onChange={(value) =>
                            setFieldValue('countryOfBirth', value)
                          }
                        />
                        <FormFeedback>{errors.countryOfBirth}</FormFeedback>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col sm={12}>
                        <Label htmlFor="usEntryDate">US Entry Date</Label>
                        <Input
                          tag={Field}
                          type="date"
                          name="usEntryDate"
                          value={values.usEntryDate}
                          onChange={handleChange}
                        />
                        <FormFeedback>{errors.usEntryDate}</FormFeedback>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col sm={12}>
                        <Label htmlFor="firstUSEnrollmentDate">
                          First Enrollment Date (US)
                        </Label>
                        <Input
                          tag={Field}
                          type="date"
                          name="firstUSEnrollmentDate"
                          value={values.firstUSEnrollmentDate}
                          onChange={handleChange}
                        />
                        <FormFeedback>{errors.email}</FormFeedback>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col sm={12}>
                        <Label htmlFor="enrollingAt">Enrolling At: </Label>
                        <Select
                          options={schools}
                          isMulti={false}
                          filterOption={createFilter({ matchFrom: 'start' })}
                          closeMenuOnSelect={true}
                          value={values.enrollingAt ? values.enrollingAt : ''}
                          onChange={(value) =>
                            setFieldValue('enrollingAt', value)
                          }
                        />
                        <FormFeedback>{errors.enrollingAt}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm={12}>
                        <Label htmlFor="enrollingAtDate">
                          1st School Year for Current School
                        </Label>
                        <div className="d-flex justify-content-start align-items-center">
                          <Tooltip
                            targetId="schoolyear"
                            title="Format"
                            message="Format: yyyy-yyyy i.e. '2020-2021'"
                          />
                          <Input
                            tag={Field}
                            type="text"
                            name="enrollingAtDate"
                            value={values.enrollingAtDate}
                            onChange={handleChange}
                            valid={
                              touched.email && !errors.email ? true : false
                            }
                            invalid={
                              touched.email && !!errors.email ? true : false
                            }
                          />
                        </div>
                        <FormFeedback>{errors.email}</FormFeedback>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col sm={12}>
                        <Label htmlFor="enrollingAt">Entering Grade: </Label>
                        <Select
                          options={grades}
                          isMulti={false}
                          filterOption={createFilter({ matchFrom: 'start' })}
                          closeMenuOnSelect={true}
                          value={
                            values.gradeEntering ? values.gradeEntering : ''
                          }
                          onChange={(value) =>
                            setFieldValue('gradeEntering', value)
                          }
                        />
                        <FormFeedback>{errors.gradeEntering}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <Button type="submit" className="mt-3">
                      Submit
                    </Button>
                  </Col>

                  <Col>
                    <FormGroup>
                      <Label htmlFor="specificLanguages">
                        {' '}
                        <h6>Primary Language</h6>
                      </Label>
                      <LanguageDropDown
                        isMulti={false}
                        isDisabled
                        languages={isoLanguages}
                        value={
                          values.specificLanguage
                            ? values.specificLanguage
                            : ' '
                        }
                        name={'specificLanguage'}
                        setState={setFieldValue}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="spokenInHome">
                        {' '}
                        Language(s) spoken at home
                      </Label>
                      <LanguageDropDown
                        isMulti={true}
                        languages={languages}
                        value={values.spokenInHome ? values.spokenInHome : ' '}
                        name={'spokenInHome'}
                        setState={setFieldValue}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="usedMostOftenWithChild">
                        {' '}
                        Language(s) <em>most often</em> spoken to child
                      </Label>
                      <LanguageDropDown
                        isMulti={true}
                        languages={languages}
                        value={
                          values.usedMostOftenWithChild
                            ? values.usedMostOftenWithChild
                            : ' '
                        }
                        name={'usedMostOftenWithChild'}
                        setState={setFieldValue}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="favored">
                        {' '}
                        Language(s) <em>currently</em> used most often at home
                      </Label>
                      <LanguageDropDown
                        isMulti={true}
                        languages={languages}
                        value={values.favored ? values.favored : ' '}
                        name={'favored'}
                        setState={setFieldValue}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="parentLanguages">
                        Native language(s) of parent/guardian{' '}
                      </Label>
                      <LanguageDropDown
                        isMulti={true}
                        languages={languages}
                        value={
                          values.parentLanguages ? values.parentLanguages : ' '
                        }
                        name={'parentLanguages'}
                        setState={setFieldValue}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="firstLearned">
                        {' '}
                        Language(s) first learned
                      </Label>
                      <LanguageDropDown
                        isMulti={true}
                        languages={languages}
                        value={values.firstLearned ? values.firstLearned : ' '}
                        name={'firstLearned'}
                        setState={setFieldValue}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <h5 className="text-center mt-5">Loading...</h5>
      )}
      <CompareUpdateModal
        submitSuccessful={submitSuccessful}
        isSubmitting={isSubmitting}
        errorModalMessage={errorModalMessage}
      />
    </>
  )
}

export default StudentForm
