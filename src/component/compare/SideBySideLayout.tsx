/* eslint-disable */
import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import fieldLookupTable from './assets/fieldLookupTable'
import GradeSelect from './StudentFieldComponents/GradeSelect'
import CountrySelect from './StudentFieldComponents/CountrySelect'
import LanguageSelect from './StudentFieldComponents/LanguageSelect'
import schema from './assets/yupSchema'
import RadioField from './StudentFieldComponents/RadioField'
import SelectField from './StudentFieldComponents/SelectField'
import CompareUpdateModal from '../modals/CompareUpdateModal'

export default function SideBySideLayout({student, survey, noStudentFound}) {
    let navigate = useNavigate()
    // Schema validation
    // Creates an updatable form based on the student and survey information.
    const [formData, setFormData] = useState(null)
    const [checkedState, setCheckedState] = useState({})
    const [manualChangeState, setmanualChangeState] = useState({})
    const [noManualChangeState, setNoManualChangeState] = useState({})
    // All and None check states for application
    const [allCheckedState, setAllCheckedState] = useState({})
    const [noneCheckedState, setNoneCheckedState] = useState({})
    // Sets whether SELECT ALL is checked
    const [isAllChecked, setIsAllChecked] = useState(false)
    // Schema Validation/Submission
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccessful, setSubmitSuccessful] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [errorParam, setErrorParam] = useState(null)
    const [errorModalMessage, setErrorModalMessage] = useState(null)
    // initializes all and none checked states
    useEffect(() => {
        // Initialize formData
        console.log(survey)
        setFormData(student)
        // create checked state based on survey AND language contexts
        Object.entries(survey).map(([key, val]) => {
            setCheckedState((prevState) => {
                return {
                    ...prevState,
                    [`check-${key}`]: false,
                }
            })
            setAllCheckedState((prevState) => {
                return {...prevState, [`check-${key}`]: true}
            })
            setNoneCheckedState((prevState) => {
                return {...prevState, [`check-${key}`]: false}
            })
            setmanualChangeState((prevState) => {
                return {...prevState, [key]: false}
            })
            setNoManualChangeState((prevState) => {
                return {...prevState, [key]: false}
            })
        })
        Object.entries(checkedState).map(([key, clicked]) => {
            let id = key.split('-')[1]
            if (clicked) {
                setFormData((prevState) => {
                    return {...prevState, [id]: survey[id]}
                })
            } else {
                setFormData((prevState) => {
                    return {...prevState, [id]: student[id]}
                })
            }
        })
    }, [])
    // Updates validation warning header
    useEffect(() => {
        setErrorParam(null)
    }, [formData])
    // UI manipulators
    const formatDate = (date) => {
        if (date) {
            date = date.split('-')
            return `${date[1]}/${date[2]}/${date[0]}`
        }
    }
    const getValue = (key) => {
        if (key === 'countryOfBirth' && survey[key] !== null) {
            return `${survey[key].name} (${survey[key].code})`
        } else {
            return survey[key]
        }
    }
    const checkSurveyBox = (event) => {
        let id = event.target.id
        let key = id.split('-')[1]
        //toggles checked state so it can be tracked by React's state
        if (checkedState[id]) {
            setCheckedState((prevState) => {
                return {...prevState, [id]: false}
            })
            setmanualChangeState({...manualChangeState, [key]: false})
            setIsAllChecked(false)
        } else {
            setCheckedState((prevState) => {
                return {...prevState, [id]: true}
            })
            setmanualChangeState({...manualChangeState, [key]: false})
        }
        // Updates the formData based on the checkbox's state
        if (
            checkedState[id] &&
            key !== 'surveyLanguageContexts' &&
            key !== 'studentLanguageContexts'
        ) {
            setFormData((prevState) => {
                return {...prevState, [key]: student[key]}
            })
        } else {
            setFormData((prevState) => {
                return {...prevState, [key]: survey[key]}
            })
        }
    }
    const toggleCheckAll = (e) => {
        if (!isAllChecked) {
            setIsAllChecked(true)
            setCheckedState(allCheckedState)
            setFormData((prevState) => {
                return {
                    ...student,
                    ...survey,
                    languageContexts: prevState.languageContexts,
                }
            })
            setmanualChangeState(noManualChangeState)
        } else {
            setIsAllChecked(false)
            setFormData({...survey, ...student})
            setCheckedState(noneCheckedState)
        }
    }
    const setClass = (key) => {
        if (key === errorParam) {
            return 'alert-danger'
        } else if (manualChangeState[key]) {
            return 'alert-warning'
        } else if (checkedState[`check-${key}`] || isAllChecked) {
            return 'alert-success'
        }
    }
    const showCheckBox = (key) => {
        if (survey[key] !== null && student[key] !== null) {
            if (key === 'countryOfBirth') {
                if (
                    survey[key].code === student[key].code &&
                    survey[key].code === formData[key].code
                ) {
                    return false
                } else {
                    return true
                }
            } else if (key.includes('screen')) {
                return false
            } else if (
                survey[key] === student[key] &&
                survey[key] === formData[key]
            ) {
                return false
            } else if (
                key === 'usEntryDate' &&
                formData.countryOfBirth.code === 'US'
            ) {
                return false
            } else return true
        } else return true
    }
    const setManualChangeById = (id) => {
        setCheckedState((prevState) => {
            return {...prevState, [`check-${id}`]: false}
        })
        setmanualChangeState((prevState) => {
            return {...prevState, [id]: true}
        })
        setIsAllChecked(false)
    }
    // Handlers
    const handleChange = (event) => {
        let id = event.target.id
        setFormData((prevState) => {
            return {...prevState, [id]: event.target.value}
        })
        setManualChangeById(id)
    }
    const handleCountrySelect = (event) => {
        let id = event.target.id
        let [name, code] = event.target.value.split('-')
        setFormData((prevState) => {
            return {...prevState, countryOfBirth: {name: name, code: code}}
        })
        setManualChangeById(id)
    }
    const handleSelect = (event) => {
        let id = event.target.id
        let value = event.target.value

        setFormData((prevState) => {
            return {...prevState, [id]: value}
        })
        setManualChangeById(id)
    }
    const handleRadio = (event) => {
        let id = event.target.name
        setFormData((prevState) => {
            return {...prevState, [id]: event.target.value}
        })
        setmanualChangeState((prevState) => {
            return {...prevState, [id]: true}
        })
    }
    // Submit functions
    const resetSubmitStatus = () => {
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitSuccessful(false)
            setErrorModalMessage(null)
        }, 1000)
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1200)
    }
    const resetAndForward = () => {
        resetSubmitStatus()
        setTimeout(() => {
            navigate('/process')
        }, 1500)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        let {
            firstName,
            lastName,
            surveyReceived,
            sex,
            firstVtEnrollmentDate,
            birthDate,
            usEntryDate,
            firstUSEnrollmentDate,
            enrollingAt,
            enrollingAtDate,
            countryOfBirth,
            permNumber,
            languageContexts,
            gradeEntering,
        } = formData
        let payload = {
            student: {
                birthDate: birthDate,
                countryOfBirth: countryOfBirth,
                enrollingAt: enrollingAt,
                enrollingAtDate: enrollingAtDate,
                firstName: firstName,
                gradeEntering: gradeEntering,
                firstUSEnrollmentDate: firstUSEnrollmentDate,
                firstVtEnrollmentDate: firstVtEnrollmentDate,
                languageContexts: languageContexts,
                lastName: lastName,
                permNumber: permNumber,
                sex: sex,
                surveyReceived: surveyReceived,
                usEntryDate: usEntryDate,
            },
            surveyId: survey.responseId,
        }

        try {
            setErrorMessage(null)
            await schema.validate(payload.student)
            setIsSubmitting(true)
            if (noStudentFound) {
                try {
                    let result = await axios.post('/student', payload)
                    setSubmitSuccessful(true)
                    resetAndForward()
                } catch (err) {
                    setErrorModalMessage(err.message)
                    resetSubmitStatus()
                }
            } else {
                try {
                    let result = await axios.put(
                        `/student/${student.permNumber}`,
                        payload
                    )
                    setSubmitSuccessful(true)
                    resetAndForward()
                } catch (err) {
                    setErrorModalMessage(err.message)
                    resetSubmitStatus()
                }
                // redirect back to previous page
            }
        } catch (error) {
            setErrorMessage(error.message)
            setErrorParam(error.path)
            window.scrollTo(0, 0)
        }
        return
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                {noStudentFound ? (
                    <h5 className="alert-warning text-center p-3">
                        {' '}
                        No Student Found Matching PERM Number. Create One Below.
                    </h5>
                ) : (
                    <h5 className="alert-success text-center p-3">
                        Student PERM Match Found. Make Edits Below.
                    </h5>
                )}
            </div>
            {errorMessage ? (
                <h5 className="alert-danger p-2 text-center">{errorMessage}</h5>
            ) : null}
            <div>
                {/* This is where the 2 components are given the information needed to inform what information is displayed where */}
                {/* <SurveyDataLayout survey={survey} checkedState={checkedState} isAllChecked={isAllChecked} checkSurveyBox={checkSurveyBox} toggleCheckAll={toggleCheckAll} />
            <StudentDataLayout formData={formData} handleChange={handleChange} manualChangeState={manualChangeState} checkedState={checkedState} /> */}
                <div className="p-2 row text-white bg-primary">
                    <input
                        className="p-2 row compare-checkbox-select text-left p-0 col-1"
                        type="checkbox"
                        checked={isAllChecked}
                        onChange={toggleCheckAll}
                        aria-label="Checkbox for following text input"
                    />
                    <h5 className="col-4 text-left">Field</h5>
                    <h5 className="col text-left pl-0">Survey Data</h5>
                    <h5 className="col">Student Data</h5>
                </div>

                {formData ? (
                    <form
                        onSubmit={onSubmit}
                        className="every-other-child-color"
                    >
                        {fieldLookupTable.fieldOrder.map((fieldItem, i) => {
                            let key = fieldItem
                            let value = getValue(fieldItem)
                            let type = fieldLookupTable[key].type
                            return (
                                <div className="p-2 row" key={i}>
                                    {/* Checkboxes */}
                                    {showCheckBox(key) ? (
                                        <input
                                            className="p-2 row compare-checkbox-select text-left p-0 col-1"
                                            id={`check-${key}`}
                                            type="checkbox"
                                            value={key}
                                            checked={
                                                checkedState[`check-${key}`]
                                            }
                                            onChange={checkSurveyBox}
                                        />
                                    ) : (
                                        <div className="col-1 row text-left"></div>
                                    )}

                                    {/* Field Name */}
                                    <label
                                        htmlFor={`check-${key}`}
                                        className="text-left col-4 pl-2"
                                    >
                                        <strong>
                                            {fieldLookupTable[key].label}
                                        </strong>
                                    </label>
                                    {/* Survey Value */}
                                    {key !== 'enrollingAtDate' ? (
                                        <div
                                            className={`col p-0 pl-1 text-left`}
                                        >
                                            {fieldLookupTable.dateFieldsToFormat.includes(
                                                key
                                            )
                                                ? formatDate(value)
                                                : value}
                                        </div>
                                    ) : (
                                        <div
                                            className={`col p-0 pl-1 text-left`}
                                            style={{fontSize: '.8rem'}}
                                        >
                                            School Year: {value}
                                            <div
                                                style={{
                                                    position: 'relative',
                                                    fontSize: '.8rem',
                                                }}
                                            >
                                                Specific Date:{' '}
                                                {formatDate(
                                                    survey.specificEnrollingAtDate
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {/* Student table fields */}
                                    {type === 'radio' ? (
                                        <RadioField
                                            setClassString={setClass(key)}
                                            formKey={key}
                                            fieldLookupTable={fieldLookupTable}
                                            type={fieldLookupTable[key].type}
                                            display={student.hasOwnProperty(
                                                key
                                            )}
                                            i={i}
                                            handleRadio={handleRadio}
                                            formData={formData}
                                        />
                                    ) : null}
                                    {type === 'select' &&
                                    key !== 'countryOfBirth' &&
                                    key !== 'gradeEntering' ? (
                                        <>
                                            <SelectField
                                                handleSelect={handleSelect}
                                                formData={formData}
                                                className={setClass(key)}
                                                formKey={key}
                                                url={
                                                    fieldLookupTable[key]
                                                        .optionsUrl
                                                }
                                                survey={survey}
                                                setClass={setClass}
                                            />
                                        </>
                                    ) : null}

                                    {type === 'select' &&
                                    key === 'gradeEntering' ? (
                                        <>
                                            <GradeSelect
                                                handleSelect={handleSelect}
                                                formData={formData}
                                                className={setClass(key)}
                                                formKey={key}
                                                survey={survey}
                                                setClass={setClass}
                                            />
                                        </>
                                    ) : null}
                                    {type === 'select' &&
                                    key === 'countryOfBirth' ? (
                                        <CountrySelect
                                            handleCountrySelect={
                                                handleCountrySelect
                                            }
                                            formData={formData}
                                            className={setClass(
                                                'countryOfBirth'
                                            )}
                                            formKey={'countryOfBirth'}
                                            url={'/public/countries'}
                                            survey={survey}
                                        />
                                    ) : null}

                                    {fieldLookupTable[key].type == 'text' &&
                                    key !== 'permNumber' &&
                                    key !== 'enrollingAtDate' ? (
                                        <input
                                            key={i}
                                            type={fieldLookupTable[key].type}
                                            className={`form-control border col pl-1 ${setClass(
                                                key
                                            )} `}
                                            id={key}
                                            value={
                                                formData[key] === null
                                                    ? ' '
                                                    : formData[key]
                                            }
                                            onChange={handleChange}
                                        />
                                    ) : null}
                                    {key === 'permNumber' ? (
                                        <input
                                            key={i}
                                            type={fieldLookupTable[key].type}
                                            className={`form-control border col pl-1 ${setClass(
                                                key
                                            )} `}
                                            id={key}
                                            value={
                                                formData[key] === null
                                                    ? ' '
                                                    : formData[key]
                                            }
                                            onChange={handleChange}
                                        />
                                    ) : null}
                                    {key === 'enrollingAtDate' ? (
                                        <input
                                            key={i}
                                            type={fieldLookupTable[key].type}
                                            className={`form-control border col pl-1 ${setClass(
                                                key
                                            )} `}
                                            id={key}
                                            value={
                                                formData[key] === null ||
                                                formData[key] === undefined
                                                    ? ' '
                                                    : formData[key]
                                            }
                                            onChange={handleChange}
                                        />
                                    ) : null}

                                    {fieldLookupTable[key].type == 'date' &&
                                    key === 'usEntryDate' &&
                                    formData.countryOfBirth !== null &&
                                    formData.countryOfBirth.code !== 'US' ? (
                                        <input
                                            key={i}
                                            type={fieldLookupTable[key].type}
                                            className={`form-control border col pl-1 ${setClass(
                                                key
                                            )} `}
                                            id={key}
                                            value={
                                                formData[key] === null
                                                    ? ' '
                                                    : formData[key]
                                            }
                                            onChange={handleChange}
                                        />
                                    ) : null}
                                    {fieldLookupTable[key].type == 'date' &&
                                    key !== 'usEntryDate' &&
                                    student.hasOwnProperty(key) ? (
                                        <input
                                            key={i}
                                            type={fieldLookupTable[key].type}
                                            disabled={
                                                formData[key] ===
                                                'United States'
                                            }
                                            className={`form-control border col pl-1 ${setClass(
                                                key
                                            )} `}
                                            id={key}
                                            value={
                                                formData[key] === null
                                                    ? ' '
                                                    : formData[key]
                                            }
                                            onChange={handleChange}
                                        />
                                    ) : null}
                                    {type === 'none' ? (
                                        <div className="col"></div>
                                    ) : null}
                                </div>
                            )
                        })}
                        <div className="p-2 row ">
                            <div className=" row compare-checkbox-select text-left p-0 col-1"></div>
                            <label className="text-left col-4 pl-2">
                                <strong>Was Screened as ELL</strong>
                            </label>
                            <div className={`col p-0 pl-1 text-left`}>
                                {survey.wasScreened
                                    ? `${survey.wasScreened}`
                                    : 'false'}
                            </div>
                        </div>
                        <hr></hr>
                        <LanguageSelect
                            surveyLanguageContextArray={survey.languageContexts}
                            studentLanguageContextArray={
                                student.languageContexts
                            }
                            formData={formData}
                            checkedState={checkedState}
                            setFormData={setFormData}
                            setCheckedState={setCheckedState}
                            student={student}
                            survey={survey}
                        />
                        <div className="row justify-content-center m-3">
                            <Button
                                variant="secondary"
                                as="input"
                                type="submit"
                                value="Submit and Archive Survey"
                            />{' '}
                        </div>
                    </form>
                ) : (
                    'Loading...'
                )}
                <CompareUpdateModal
                    isSubmitting={isSubmitting}
                    submitSuccessful={submitSuccessful}
                    errorModalMessage={errorModalMessage}
                />
            </div>
        </>
    )
}
