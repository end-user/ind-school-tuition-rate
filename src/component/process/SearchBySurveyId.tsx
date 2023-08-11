import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import SearchingModal from '../modals/SearchingModal'
import SurveyUpdateModal from '../modals/SurveyUpdateModal'
import ErrorModal from '../modals/ErrorModal'

export default function SearchBySurveyId() {

    let history = useNavigate()

    const [surveyId, setSurveyId] = useState("")
    const [showSearchingModal, setShowSearchingModal] = useState(false)
    const [showSurveyUpdateModal, setShowSurveyUpdateModal] = useState(false)
    const [initialSurveyValues, setInitialSurveyValues] = useState({ firstName: " ", lastName: " ", birthDate: " ", sex: " ", id: " " })
    const [searchingModalMessage, setSearchingModalMessage] = useState("Searching...")

    const handleEnter = (event) => {
        if (event.keyCode == 13 && surveyId) {
            searchForSurvey()
        }
    }
    const handleChange = event => {
        setSurveyId(event.target.value)
    }
    const closeSearchingModal = () => {
        setShowSearchingModal(false)
    }
    const openSearchingModal = () => {
        setSearchingModalMessage("Searching...")
        setShowSearchingModal(true)
    }
    const toggleModal = () => {
        showSurveyUpdateModal ? setShowSurveyUpdateModal(false) : setShowSurveyUpdateModal(true)
    }

    const searchForSurvey = async (event) => {
        openSearchingModal()
        try {
            let result = await axios.get(`/surveyandstudent/${surveyId}`)
            if (result.data.student === null) {
                closeSearchingModal()
                const { firstName, lastName, birthDate, sex, responseId } = result.data.surveyResponse
                setInitialSurveyValues({ firstName: firstName, lastName: lastName, birthDate: birthDate, sex: sex, id: responseId })
                toggleModal()
            } else {
                closeSearchingModal()
                history.push(`/form/${surveyId}`)
            }
        } catch (error) {
            setSearchingModalMessage("No survey found")
        }
    }




    return (
        <>
            <div className="d-flex mt-1">
                <input className="p-1 mr-1" type="text" placeholder={"enter survey ID"} value={surveyId} onKeyDown={handleEnter} onChange={handleChange} />
                {surveyId ?
                    <Button onClick={searchForSurvey}>Search</Button>
                    :
                    <Button onClick={searchForSurvey} disabled>Search</Button>
                }
            </div>
            <SearchingModal searchingModalMessage={searchingModalMessage} closeSearchingModal={closeSearchingModal} showSearchingModal={showSearchingModal} />
            <SurveyUpdateModal showSurveyUpdateModal={showSurveyUpdateModal} surveyInitialVals={initialSurveyValues} toggleModal={toggleModal} />
        </>
    )
}
