import React, { useState, useEffect } from 'react'
import StudentList from './StudentList'

export default function SearchResults({ searchResults }) {

    const [resultMessage, setResultMessage] = useState("Heyyy")

    useEffect(() => {

        if (searchResults.length == 0) {
            setResultMessage("No matches found")
        }

        if (searchResults.length == 1) {
            setResultMessage("We found one student matching your search")
        }

        if (searchResults.length > 1) {
            setResultMessage("Multiple students found. Please select from results below")
        }

    }, [searchResults])


    return (
        <>
            <div className=" mt-4 text-center">{resultMessage}</div>
            <StudentList data={searchResults} />
        </>
    )
}
