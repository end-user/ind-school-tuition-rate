import React, {useEffect, useState} from 'react'
import {Button, Form, Row} from 'react-bootstrap'
import axios from 'axios'

export default function QueryBuilder({setSearchResults, setLoading}) {
    const grades = [
        {value: " ", label: 'None Selected'},
        {value: "PreK", label: "PreK"},
        {value: "K", label: "K"},
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
    const [districts, setDistricts] = useState([])
    const [queryParams, setQueryParams] = useState(JSON.parse(window.localStorage.getItem('queryParams')) || {})
    const [searchWarning, setSearchWarning] = useState(false)
    const [schools, setSchools] = useState(null)


    const fetchData = async (url, setter, valueString, labelString) => {
        let response = await axios.get(url)
        let optionData = response.data

        // Model data based off of anticipated fields
        if (optionData.length > 0) {
            optionData = optionData.map((l) => {
                return {
                    value: l[valueString],
                    label: `${l[labelString]} (${l[valueString]})`
                }
            })
        }
        setter(optionData)
    }
    useEffect(() => {
        // Server API reversed : '/schools' actually returns Schools
        // Sets Schools
        fetchData('/public/schools', setSchools, 'stateId', 'name')
        fetchData('/districts', setDistricts, 'id', 'name')


    }, [])

    useEffect(() => {
        if (queryParams.districtId != null) {
            fetchData(`/schools/district/${queryParams.districtId}`, setSchools, 'stateId', 'name')
        } else if (queryParams.districtId == null) {
            fetchData('/public/schools', setSchools, 'stateId', 'name')
        }
    }, [queryParams.districtId])

    const findIfShouldSearch = (paramObj) => {
        let localStoreKeys = Object.keys(paramObj)
        let shouldSearch = false
        for (let i = 0; i < localStoreKeys.length; i++) {
            if (queryParams[localStoreKeys[i]] != ("" || "Please select a field")) {
                shouldSearch = true
            }
        }
        return shouldSearch
    }

    const handleChange = (e) => {
        let id = e.target.id
        let value = e.target.value

        setQueryParams(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const makeQueryString = (url, paramObj) => {
        let keyArray = Object.keys(paramObj)
        let queryString = ""
        keyArray.map(key => {
            if (paramObj[key].trim()) {
                queryString += key + "=" + paramObj[key] + "&"
            }
        })
        return (`${url}?${queryString}`)
    }

    // Get results here
    const searchForStudent = async (url) => {
        try {
            setLoading(true)
            let result = await axios.get(url)
            setSearchResults(result.data)
            window.localStorage.setItem('searchResults', JSON.stringify(result.data))
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.debug(error)
        }
    }

    const clickSearchButton = (e) => {
        e.preventDefault()

        let shouldSearch = findIfShouldSearch(queryParams)
        if (shouldSearch) {
            setSearchWarning(false)
            localStorage.setItem('queryParams', JSON.stringify(queryParams))
            let queryURL = makeQueryString(`/student/search`, queryParams)
            searchForStudent(queryURL)
        } else {
            setSearchWarning(true)
        }
    }

    const clearSearch = () => {
        localStorage.removeItem('queryParams')
        localStorage.removeItem('searchResults')
        setQueryParams({})
        setLoading(false)
        setSearchResults(null)
    }

    return (
        <div className="d-flex flex-column">
            <Form className="col-12" onSubmit={clickSearchButton}>
                <Row>
                    <Form.Group className="mb-3 col" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control onChange={handleChange} value={queryParams.firstName || ""} type="text" placeholder="First Name" />
                    </Form.Group>
                    <Form.Group className="mb-3 col" controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control onChange={handleChange} value={queryParams.lastName || ""} type="text" placeholder="Last Name" />
                    </Form.Group>

                    <Form.Group className="mb-3 col" controlId="districtId">
                        <Form.Label>School District</Form.Label>
                        <Form.Control value={queryParams.districtId || ""} onChange={handleChange} as="select" placeholder="School District" >
                            {districts ?
                                districts.map((option, i) => (
                                    <option key={i} value={option.value}>{option.label}</option>
                                )) : null}
                            <option value="">Select School</option>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3 col" controlId="schoolId">
                        <Form.Label>School</Form.Label>
                        <Form.Control value={queryParams.schoolId || ""} onChange={handleChange} as="select" placeholder="School District" >
                            {schools ?
                                schools.map((option, i) => (
                                    <option key={i} value={option.value}>{option.label}</option>
                                ))
                                : null}
                            <option value="">Select a District</option>
                        </Form.Control>
                    </Form.Group>


                </Row>
                <Row className="d-flex justify-content-center">
                    <Form.Group className="mb-3 col-4" controlId="permNum">
                        <Form.Label>PERM Number</Form.Label>
                        <Form.Control value={queryParams.permNum || ""} onChange={handleChange} type="number" placeholder="PERM Number" />
                    </Form.Group>
                    <Form.Group className="mb-3 col-4" controlId="grade">
                        <Form.Label>Grade</Form.Label>
                        <Form.Control value={queryParams.grade || ""} onChange={handleChange} as="select" placeholder="School District" >
                            {grades.map((option, i) => (
                                <option key={i} value={option.value}>{option.label}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <button type="button" className="col-2 btn btn-outline-secondary mt-3 align-self-center" onClick={clearSearch}>Clear</button>

                </Row>
                <Row className="d-flex text-center justify-content-center">
                    {searchWarning ?
                        <h6 className="col-4 p-2 alert-warning text-center" variant={'warning'} >Please enter at least one field</h6>
                        : null
                    }
                </Row>
                <Row className="justify-content-center">
                    <Button type="submit" className="col-3 mt-3 align-self-center" >Search</Button>
                </Row>
            </Form>
            <Row className="justify-content-center">
            </Row>
        </div>
    )
}
