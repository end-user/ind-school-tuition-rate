import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import SubmittingModal from '../modals/SubmittingModal'
import schema from './assets/yupSchema'
import ImmigrantTooltip from './ImmigrantTooltip'
import EnglishLearnerTooltip from './EnglishLearnerTooltip'
import Selector from './Selector'
import SurveyInstructions from './SurveyInstructions'
import LanguageInformation from './LanguageInformation'

const Survey = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccessful, setSubmitSuccessful] = useState(false)
    const [countries, setCountries] = useState()
    const [languages, setLanguages] = useState()
    const [schools, setSchools] = useState()
    const [formData, setFormData] = useState(null)
    const [iso639_3, setIso639_3] = useState()
    const [suggestedLanguage, setSuggestedLanguage] = useState(null)
    const [cob, setCob] = useState('')
    const grades = ['PreK', 'K', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((l) => ({
        value: l,
        label: l,
    }))
    const [showPDFLink, setShowPDFLink] = useState(false)

    const { register, formState: { errors }, control, watch, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema),
    })

    // set the "tooltip" to point towards a recommended language based on selected 'primary' language
    useEffect(() => {
        let pathVar = watch('specificLanguage').value
        axios.get(`/public/crosswalkTable/${pathVar}`).then(
            (resp) => {
                if (resp.data) {
                    setSuggestedLanguage(resp.data.suggestedLanguage.language)
                } else {
                    setSuggestedLanguage('No suggestion found')
                }
            },
            (error) => console.error(error)
        )
    }, [watch('specificLanguage')])

    useEffect(() => {
        setCob(watch('birthCountry').value)
    }, [watch('birthCountry')])

    useEffect(() => {
        const languageURL = '/public/languages',
            countryURL = '/public/countries',
            schoolURL = '/public/schools',
            iso639_3URL = '/public/ISO_639-3'
        axios
            .get(languageURL, {
                headers: { 'Access-Control-Allow-Origin': '*' },
            })
            .then(
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
        axios
            .get(countryURL, {
                headers: { 'Access-Control-Allow-Origin': '*' },
            })
            .then(
                (countryResponse) => {
                    const countries = countryResponse.data.map((l) => ({
                        value: l.code,
                        label: l.name + ' (' + l.code + ')',
                    }))
                    setCountries(countries)
                    return countries
                },
                (error) => {
                    console.error(error)
                }
            )
        axios
            .get(iso639_3URL, {
                headers: { 'Access-Control-Allow-Origin': '*' },
            })
            .then(
                (lang3Response) => {
                    const languages = lang3Response.data.map((l) => ({
                        value: l.id, //l.id,
                        label: l.name,
                    }))
                    setIso639_3(languages)
                    return languages
                },
                (error) => {
                    console.error(error)
                }
            )
        axios
            .get(schoolURL, {
                headers: { 'Access-Control-Allow-Origin': '*' },
            })
            .then(
                (schoolResponse) => {
                    setSchools(
                        schoolResponse.data.map((l) => ({
                            value: l.id, //l.id,
                            label: l.name,
                        }))
                    )
                },
                (error) => {
                    console.error(error)
                }
            )
    }, [])
    const closeModalAndReset = () => {
        setIsSubmitting(false)
        setSubmitSuccessful(false)
        setShowPDFLink(false)
        reset()
        setFormData(null)
    }
    const doSubmit = async (data) => {
        setIsSubmitting(true)
        axios({
            method: 'post',
            url: '/public/survey',
            data: data,
            // , headers: {'Content-Type': 'multipart/form-data'}
        })
            .then((response) => {
                console.log(response)
                setSubmitSuccessful(true)
                console.log(data)
                setFormData(data)
                setShowPDFLink(true)
            })
            // .then(() => {
            //     setTimeout(() => {
            //         setIsSubmitting(false)
            //         setSubmitSuccessful(false)
            //     }, 1000)
            //     // PDF SAVE
            // })
            // .then(() => {
            //     setShowPDFLink(true)
            //     reset()
            //     setFormData(data)
            // })
            .catch((error) => {
                //handle error
                console.error(error.message)
                setIsSubmitting(false)
            })
        return
    }

    return (
        <div>
            <SurveyInstructions />
            <form onSubmit={handleSubmit(doSubmit)}>
                <div className="card border-dark">
                    <div className="card-header text-white bg-primary">
                        Student Information
                    </div>
                    <div className="card-body">
                        <div className="form-group row">
                            <div className="col">
                                <label htmlFor="firstName">First name:</label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors.firstName && ' is-invalid'
                                    }`}
                                    ref={register}
                                    id="firstName"
                                    name="firstName"
                                />
                                {errors.firstName && (
                                    <div className="invalid-feedback">
                                        {errors.firstName.message}
                                    </div>
                                )}
                            </div>
                            <div className="col">
                                <label htmlFor="lastName">Last Name:</label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors.lastName && ' is-invalid'
                                    }`}
                                    ref={register}
                                    id="lastName"
                                    name="lastName"
                                />
                                {errors.lastName && (
                                    <div className="invalid-feedback">
                                        {errors.lastName.message}
                                    </div>
                                )}
                            </div>
                            <div className="col">
                                <label htmlFor="birthDate">
                                    Date of Birth:
                                </label>
                                <input
                                    type="date"
                                    className={`form-control ${
                                        errors.birthDate && ' is-invalid'
                                    }`}
                                    ref={register}
                                    id="birthDate"
                                    name="birthDate"
                                />
                                {errors.birthDate && (
                                    <div className="invalid-feedback">
                                        {errors.birthDate.message}
                                    </div>
                                )}
                            </div>
                            <div className="col">
                                <div
                                    className={`form-group ${
                                        errors.sex && 'is-invalid'
                                    }`}
                                >
                                    <label>Gender:</label>
                                    <div className="form-check">
                                        <input
                                            className={`form-check-input ${
                                                errors.sex && ' is-invalid'
                                            }`}
                                            type="radio"
                                            name="sex"
                                            id={'male'}
                                            value="M"
                                            ref={register}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="male"
                                        >
                                            {' '}
                                            Male{' '}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className={`form-check-input ${
                                                errors.sex && ' is-invalid'
                                            }`}
                                            type="radio"
                                            name="sex"
                                            id={'female'}
                                            value="F"
                                            ref={register}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="female"
                                        >
                                            {' '}
                                            Female{' '}
                                        </label>
                                    </div>
                                </div>
                                {errors.sex && (
                                    <div className="invalid-feedback">
                                        {errors.sex.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col">
                                <label>Country of Birth:</label>
                                <Selector
                                    name="birthCountry"
                                    error={errors}
                                    control={control}
                                    options={countries}
                                />
                                {errors.birthCountry && (
                                    <div className="invalid-feedback">
                                        {errors.birthCountry.message}
                                    </div>
                                )}
                            </div>
                            <div className="col">
                                <label htmlFor="dob">
                                    Date of Entry in U.S.
                                </label>
                                <input
                                    disabled={cob == 'US'}
                                    type="date"
                                    className={`form-control ${
                                        errors.usEntryDate && ' is-invalid'
                                    }`}
                                    ref={register}
                                    name="usEntryDate"
                                />
                                {errors.usEntryDate && (
                                    <div className="invalid-feedback">
                                        {errors.usEntryDate.message}
                                    </div>
                                )}
                            </div>
                            <div className="col">
                                <label htmlFor="firstUSEnrollmentDate">
                                    Date Student first began in any U.S. school:
                                </label>
                                <input
                                    type="Date"
                                    className={`form-control ${
                                        errors.firstUSEnrollmentDate &&
                                        ' is-invalid'
                                    }`}
                                    ref={register}
                                    name="firstUSEnrollmentDate"
                                />
                                {errors.firstUSEnrollmentDate && (
                                    <div className="invalid-feedback">
                                        {errors.firstUSEnrollmentDate.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="card-header text-white bg-primary">
                        Family Information
                    </div>
                    <div className="card-body">
                        <h6 className="form-group row">
                            <div className="col-3">
                                <label>
                                    Primary Language <br /> (other than English)
                                </label>
                            </div>
                            <div className="col-6">
                                <Selector
                                    name={'specificLanguage'}
                                    options={iso639_3}
                                    error={errors}
                                    control={control}
                                    isSearchable={true}
                                />
                            </div>
                            <div className="col-3 alert-info">
                                {suggestedLanguage
                                    ? `Suggested language : ${suggestedLanguage}`
                                    : null}
                            </div>
                        </h6>
                        <div className="form-group row">
                            <div className="col-3">
                                <label htmlFor={'spokenInHome'}>
                                    What language(s) are spoken in your home?
                                </label>
                            </div>
                            <div className="col">
                                <Selector
                                    name="spokenInHome"
                                    options={languages}
                                    error={errors}
                                    control={control}
                                    isMulti
                                    closeMenuOnSelect={false}
                                />
                                {errors.spokenInHome && (
                                    <div className="invalid-feedback">
                                        {errors.spokenInHome.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-3">
                                <label>
                                    What language do you <em>most often</em>{' '}
                                    speak to your child?
                                </label>
                            </div>
                            <div className="col">
                                {/*<label htmlFor="usedMostOftenWithChild">Parent/guardian</label>*/}
                                <Selector
                                    name={'usedMostOftenWithChild'}
                                    options={languages}
                                    error={errors}
                                    control={control}
                                    isMulti
                                    closeMenuOnSelect={false}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-3">
                                <label htmlFor={'favored'}>
                                    What language does your child{' '}
                                    <em>currently</em> use most often at home?
                                </label>
                            </div>
                            <div className="col">
                                <Selector
                                    name={'favored'}
                                    options={languages}
                                    error={errors}
                                    control={control}
                                    isMulti
                                    closeMenuOnSelect={false}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-3">
                                <label>
                                    {' '}
                                    What are the native languages of the
                                    parent/guardians?{' '}
                                </label>
                            </div>
                            <div className="col">
                                <Selector
                                    name={'parentLanguages'}
                                    options={languages}
                                    error={errors}
                                    control={control}
                                    isMulti
                                    closeMenuOnSelect={false}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-3">
                                <label>
                                    Which language did your child learn first?
                                </label>
                            </div>
                            <div className="col">
                                <Selector
                                    name={'firstLearned'}
                                    options={languages}
                                    error={errors}
                                    control={control}
                                    isMulti
                                    closeMenuOnSelect={false}
                                />
                            </div>
                        </div>
                        <LanguageInformation />
                    </div>
                    <div className="card-header text-white bg-primary">
                        School Information
                    </div>
                    <div className="card-body">
                        <div className="form-group row">
                            <div className="col-4">
                                <label htmlFor="enrollingAt">
                                    What school <em>will</em> the student
                                    attend?
                                </label>
                                <Selector
                                    name={'enrollingAt'}
                                    options={schools}
                                    error={errors}
                                    control={control}
                                />
                            </div>
                            <div className="col-4">
                                <label htmlFor="enrollingAtDate">
                                    Beginning date in this school
                                </label>
                                <input
                                    type="date"
                                    className={`form-control ${
                                        errors.enrollingAtDate && ' is-invalid'
                                    }`}
                                    ref={register}
                                    id="enrollingAtDate"
                                    name="enrollingAtDate"
                                />
                                {errors.enrollingAtDate && (
                                    <div className="invalid-feedback">
                                        {errors.enrollingAtDate.message}
                                    </div>
                                )}
                            </div>
                            <div className="col-4">
                                <label>
                                    What grade will the student enter?
                                </label>
                                <Selector
                                    name={'enrollingGrade'}
                                    options={grades}
                                    error={errors}
                                    control={control}
                                />
                                {errors.enrollingGrade && (
                                    <div className="invalid-feedback">
                                        {errors.enrollingGrade.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="card-body" id={'screenQuestion'}>
                        <div className="form-group row">
                            <div className="col-7">
                                <label>
                                    Was this student screened for English
                                    Language Proficiency and identified as an
                                    English Learner (EL)?{' '}
                                    <EnglishLearnerTooltip />
                                </label>
                            </div>
                            <div className={'col'}>
                                <div
                                    className={`form-group ${
                                        errors.wasScreened && 'is-invalid'
                                    }`}
                                >
                                    <div className="form-check">
                                        <input
                                            className={`form-check-input ${
                                                errors.wasScreened &&
                                                ' is-invalid'
                                            }`}
                                            type="radio"
                                            data-toggle="collapse"
                                            data-target=".screeningDetails:not(.show)"
                                            name="wasScreened"
                                            value="Y"
                                            id={'wasScreened-no'}
                                            ref={register}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="wasScreened-no"
                                        >
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className={`form-check-input ${
                                                errors.wasScreened &&
                                                ' is-invalid'
                                            }`}
                                            type="radio"
                                            data-toggle="collapse"
                                            data-target=".notScreened:not(.show)"
                                            name="wasScreened"
                                            value="N"
                                            id={'wasScreened-yes'}
                                            ref={register}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="wasScreened-yes"
                                        >
                                            No
                                        </label>
                                    </div>
                                </div>
                                {errors.wasScreened && (
                                    <div className="invalid-feedback">
                                        {errors.wasScreened.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            className="form-group row collapse screeningDetails"
                            data-parent={'#screenQuestion'}
                        >
                            <div className="col">
                                <label>Name of Test Administrator</label>
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors.screenerName && ' is-invalid'
                                    }`}
                                    ref={register}
                                    name="screenerName"
                                />
                                {errors.screenerName && (
                                    <div className="invalid-feedback">
                                        {errors.screenerName.message}
                                    </div>
                                )}
                            </div>
                            <div className="col-3">
                                <label>Date Student Screened</label>
                                <input
                                    type="date"
                                    className={`form-control ${
                                        errors.screenedDate && ' is-invalid'
                                    }`}
                                    ref={register}
                                    name="screenedDate"
                                />
                                {errors.screenedDate && (
                                    <div className="invalid-feedback">
                                        {errors.screenedDate.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            className="form-group row collapse notScreened"
                            data-parent={'#screenQuestion'}
                        >
                            <div className="col-7">
                                <label>
                                    If not identified as an English Learner,
                                    does the student meet the ESSA Definition of
                                    "Immigrant Children and Youth"?
                                    <ImmigrantTooltip />
                                </label>
                            </div>
                            <div className={'col'}>
                                <div
                                    className={`form-group ${
                                        errors.isImmigrant && 'is-invalid'
                                    }`}
                                >
                                    <div className="form-check">
                                        <input
                                            className={`form-check-input ${
                                                errors.isImmigrant &&
                                                ' is-invalid'
                                            }`}
                                            type="radio"
                                            name="isImmigrant"
                                            value="Y"
                                            id={'isImmigrant-no'}
                                            ref={register}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="isImmigrant-no"
                                        >
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className={`form-check-input ${
                                                errors.isImmigrant &&
                                                ' is-invalid'
                                            }`}
                                            type="radio"
                                            name="isImmigrant"
                                            value="N"
                                            id={'isImmigrant-yes'}
                                            ref={register}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="isImmigrant-yes"
                                        >
                                            No
                                        </label>
                                    </div>
                                </div>
                                {errors.isImmigrant && (
                                    <div className="invalid-feedback">
                                        {errors.isImmigrant.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="col-3 text-center d-flex justify-content-center flex-column">
                            <button
                                type="submit"
                                className="btn btn-outline-primary"
                            >
                                Submit to AOE
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <SubmittingModal
                isSubmitting={isSubmitting}
                submitSuccessful={submitSuccessful}
                data={formData}
                showPDFLink={showPDFLink}
                close={closeModalAndReset}
            />
        </div>
    )
}

export default Survey
