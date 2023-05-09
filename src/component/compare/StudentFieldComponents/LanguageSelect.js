/* eslint-disable */
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

export default function LanguageSelect({ student, survey, setFormData, checkedState, setCheckedState, formData, surveyLanguageContextArray, studentLanguageContextArray }) {

    const [surveyLanguageList, setSurveyLanguageList] = useState(surveyLanguageContextArray)
    const [studentLanguageList,] = useState(studentLanguageContextArray)

    const titleize = (str) => {
        return str[0].toUpperCase() + str.slice(1)
    }

    const compareLanAndContext = (language, context) => {
        for (let i = 0; i < formData.languageContexts.length; i++) {
            let formObj = formData.languageContexts[i]
            if ((formObj.language.language === language && formObj.context.context === context)) {
                return 'language-strike-through'
            }
        }
    }
    const handleRemoveLanguage = event => {
        let index = +event.target.dataset.index

        setFormData(prevState => {
            return ({
                ...prevState, languageContexts: prevState.languageContexts.filter((item, j) => index !== j)
            })
        })
        event.preventDefault()
    }
    const handleAddLanguage = event => {
        event.preventDefault()
        let dataSet = event.target.dataset
        let { index } = dataSet
        setFormData(prevState => {
            return ({ ...prevState, languageContexts: [...prevState.languageContexts, surveyLanguageList[index]] })
        })
    }

    const clearLanguages = event => {
        setFormData(prevState => {
            return ({ ...prevState, languageContexts: studentLanguageList })
        })
        setSurveyLanguageList(survey.languageContexts)
        setCheckedState(prevState => {
            return ({ ...prevState, 'check-surveyLanguageContexts': false, 'check-studentLanguageContexts': false })
        })
    }

    const checkLanguageBox = event => {
        let id = event.target.id
        let key = id.split('-')[1]
        if (key === "studentLanguageContexts") {
            if (checkedState["check-studentLanguageContexts"]) {
                setCheckedState(prevState => {
                    return ({ ...prevState, "check-studentLanguageContexts": false, "check-surveyLanguageContexts": true })
                })
                setFormData(prevState => {
                    return ({ ...prevState, languageContexts: survey.languageContexts })
                })
            } else {
                setCheckedState(prevState => {
                    return ({ ...prevState, "check-studentLanguageContexts": true, "check-surveyLanguageContexts": false })
                })
                setFormData(prevState => {
                    return ({ ...prevState, languageContexts: student.languageContexts })
                })
            }
        } else if (key === "surveyLanguageContexts") {
            if (checkedState["check-surveyLanguageContexts"]) {
                setCheckedState(prevState => {
                    return ({ ...prevState, "check-studentLanguageContexts": true, "check-surveyLanguageContexts": false })
                })
                setFormData(prevState => {
                    return ({ ...prevState, languageContexts: student.languageContexts })
                })
            } else {
                setCheckedState(prevState => {
                    return ({ ...prevState, "check-studentLanguageContexts": false, "check-surveyLanguageContexts": true })
                })
                setFormData(prevState => {
                    return ({ ...prevState, languageContexts: survey.languageContexts })
                })
            }
        }
    }

    return (
        <>
            <div className="input-group-text row text-white bg-primary" >
                <h5>Languages Spoken</h5>
                <div className="p-2 small"></div>
            </div>
            <div className="input-group-text row alert-info">Add or remove languages from student record</div>
            <div className="input-group-text row bg-secondary text-left" >
                <div className="col-6 flex-justify-align">
                    <Button style={{ position: "relative", height: '35px', width: "45px" }} className="d-flex  justify-content-center align-items-center" onClick={clearLanguages}>Reset</Button>

                    <input name="langSelect" className="input-group-text row compare-checkbox-select text-left m-2" id={'check-surveyLanguageContexts'} checked={checkedState['check-surveyLanguageContexts']} type="checkbox" onChange={checkLanguageBox} />
                    <label htmlFor="check-surveyLanguageContexts" className="m-0"><strong>Select all from survey</strong></label>
                </div>

                <div className="col-6 text-center">Selected Languages</div>
            </div>
            <div className="row" style={{ minHeight: "500px" }} >
                <div className={`col`}>
                    {surveyLanguageList ?
                        surveyLanguageList.map((language, i) => (
                            <div className={`col row mt-3 small ${compareLanAndContext(language.language.language, language.context.context)}`}>
                                <div className=" pb-2 text-left col pl-2"><strong> {titleize(language.context.context)}:</strong></div>
                                <div className=" pb-2 text-left col pl-2"> {language.language.language} ({language.language.code.toUpperCase()})</div>

                                {compareLanAndContext(language.language.language, language.context.context) === "language-strike-through" ?
                                    null :
                                    <Button disabled={checkedState['check-surveyLanguageContexts'] ? true : false} onClick={handleAddLanguage} data-index={i} data-surveylanguage={language.language.language} data-surveycontext={language.context.context} variant="success" size="sm" className="p-2 text-center d-flex  justify-content-center align-items-center" style={{ height: '25px', width: "25px" }}> + </Button>
                                }

                            </div>
                        ))
                        : null}
                </div>

                {
                    formData.languageContexts.length > 0 ?
                        <div className={`col small `} >
                            {
                                formData.languageContexts.map((language, i) => (
                                    <div className={`col row mt-3`} key={i}  >
                                        <div className=" pb-2 text-left col pl-2"><strong> {titleize(language.context.context)}:</strong></div>
                                        <div className=" pb-2 text-left col pl-2"> {language.language.language} <strong>({language.language.code.toUpperCase()})</strong></div>
                                        <Button onClick={handleRemoveLanguage} data-index={i} color="red" size="sm" variant="danger" className="p-1 text-center d-flex  justify-content-center align-items-center" style={{ height: '25px', width: "25px" }}> - </Button>
                                    </div>
                                ))
                            }
                        </div>
                        :
                        <div className={`col small d-flex justify-content-center align-items-center ${checkedState['check-studentLanguageContexts']}`}>
                            <h4 >No languages Selected</h4>
                        </div>
                }
            </div >
        </>
    )
}
