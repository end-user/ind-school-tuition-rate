import React, { useState, useEffect } from 'react'
import QueryBuilder from './components/QueryBuilder'
import SearchResults from './components/SearchResults'
import StudentSearchInstructions from './components/StudentSearchInstructions'

export default function StudentSearch() {
    const [searchResults, setSearchResults] =  useState( null)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
       setSearchResults(JSON.parse(window.localStorage.getItem('searchResults') || null))
    }, [])
    return (
        <div>
            <h5 className="text-center mb-0 p-2">Student Search</h5>
            <a href="#student-search-instructions" data-toggle="collapse" className="m-0 mb-2 align-self-end" size="sm" >What's this?</a>
            <hr />
            <StudentSearchInstructions />
            <QueryBuilder setSearchResults={setSearchResults} setLoading={setLoading} />
            {loading ? <h5 className="text-center mt-5">Loading...</h5> : null}
            {(searchResults) ?
                <SearchResults searchResults={searchResults} />
                : null}
        </div >
    )
}
