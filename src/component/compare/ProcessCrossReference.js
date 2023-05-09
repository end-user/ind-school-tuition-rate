/* eslint-disable */
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import SideBySideLayout from './SideBySideLayout'
import axios from 'axios'
import SurveyAndStudentLoadingModal from '../modals/SurveyAndStudentLoadingModal'
import emptyStudent from './assets/emptyStudent'


export default function ProcessCrossReference() {

    // This is where data is gathered based on the params sent to DB
    let {id} = useParams()
    const [survey, setSurvey] = useState({})
    const [student, setStudent] = useState({})
    // These are the variables that inform what the loading modal will display (getting survey, getting student, error....)
    const [gettingSurvey, setGettingSurvey] = useState(false)
    const [gettingStudent, setGettingStudent] = useState(false)
    const [errorReceived, setErrorReceived] = useState(false)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [noStudentFound, setNoStudentFound] = useState(false)
    /*
    Runs on initial load of the page and retrieves the 'starting' information for the comparison page 
    (survey data and matching student data. All altered information is then stored in the formData state, maintained
        by the StudentDataLayout component.
    */


    useEffect(() => {

        async function fetchData() {
            try {
                // Retrieves survey and student information, based on survey ID
                setGettingSurvey(true)
                const {data} = await axios.get(`/surveyandstudent/${id}`);
                const {surveyResponse, student} = data
                // 
                surveyResponse.specificEnrollingAtDate = surveyResponse.enrollingAtDate
                surveyResponse.enrollingAtDate = formatEnrollingAtDate(surveyResponse.enrollingAtDate)
                surveyResponse.gradeEntering = formatGradeEntering(surveyResponse.gradeEntering)
                student.enrollingAtDate = formatEnrollingAtDate(student.enrollingAtDate)
                // 
                setGettingSurvey(false)
                setGettingStudent(false)
                setSurvey(surveyResponse)
                if (surveyResponse === null) {
                    setErrorReceived(true)
                    setErrorMessage("No record found!")
                }

                if (student.permNumber === null) {
                    setStudent(emptyStudent)
                    setNoStudentFound(true)
                } else {
                    setStudent(student)
                }
                setDataLoaded(true)
            } catch (error) {
                // catches error for survey query.
                console.error(error)
                setGettingSurvey(false)
                setErrorReceived(true)
                setErrorMessage(error)
            }
        }

        setGettingStudent(false)
        fetchData()
        //axios thing eventually to query for individual survey- abstract out
        // use id or PERM number or SOMETHING to hit the other database (if it can)
    }, [id])

    const formatEnrollingAtDate = (date) => {
        if (date) {
            let startingDate = +date.split('-')[0]
            return (`${startingDate}-${startingDate + 1}`)
        }
    }
    const formatGradeEntering = (str) => {
        if (str) {
            if (str === 'PreK') {
                return "PreK"
            }
            if (str === 'K') {
                return "K"
            } else if (str.length === 1) {
                return `0${str}`
            } else {
                return str
            }
        } else {
            return " "
        }
    }

    return (
        <div>
            {dataLoaded ?
                <SideBySideLayout survey={survey} student={student} noStudentFound={noStudentFound}/>
                : null}
            <SurveyAndStudentLoadingModal show={!dataLoaded} gettingSurvey={gettingSurvey} errorMessage={errorMessage}
                                          gettingStudent={gettingStudent} errorReceived={errorReceived}/>

        </div>
    )
}
