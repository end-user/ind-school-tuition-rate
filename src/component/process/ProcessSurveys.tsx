import React, {useEffect, useMemo, useState} from 'react'
import axios from "axios";
import SurveyList from "./SurveyList";
import PaginatorNav from './PaginatorNav';
import ErrorModal from '../modals/ErrorModal'
import SurveyUpdateModal from '../modals/SurveyUpdateModal'


/*
This is the main Table component in charge of most state in terms of the survey list view.

In it, the table layout is memoized, and a series of pagination state values are initialized and maintained.

Paginator props are sent to the PaginatorNav component, and the data itself is sent to the SurveyList Component.
*/
const ProcessSurveys = () => {
    // Outlines table fields
    const columns = useMemo(
        () => [

            {
                Header: 'Survey ID',
                accessor: 'responseId'
            },


            {
                Header: 'First Name',
                accessor: 'firstName',
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
            },


            {
                Header: 'DOB',
                accessor: r => {
                    return (new Date(r.birthDate)).toLocaleDateString('en-US', {timeZone: 'UTC'})
                },
            },
            {
                Header: 'Country',
                accessor: 'countryOfBirth.name',
            },
            {
                Header: 'School',
                accessor: 'enrollingAt',
            },
            {
                Header: 'PERM Number',
                accessor: 'permNumber'
            },

        ],
        []
    )


    //  Here we define the hooks in charge of the various component states
    // data starts empty
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    // Pagination hooks are folded into functions and sent to Paginator Nav.
    // Changing these causes the UseEffect() hook to retrieve different data,
    // Which is sent to the table.
    const [pageCount, setPageCount] = useState(+localStorage.getItem(0))
    const [pageIndex, setPageIndex] = useState(+localStorage.getItem('pageIndex') || 1)
    const [pageSize, setPageSize] = useState(+localStorage.getItem('pageSize') || 10)
    const [canPreviousPage, setCanPreviousPage] = useState(true)
    const [canNextPage, setCanNextPage] = useState(true)
    const [totalResults, setTotalResults] = useState(0)
    const [sortField, setSortField] = useState(localStorage.getItem('sortField') || 'responseId')
    const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'desc')
    const [yCoord, setYCoord] = useState(localStorage.getItem('yCoord') || 0)
    // error handling
    const [errorResponse, setErrorResponse] = useState({})
    const [isError, setIsError] = useState(false)

    // update survey modal
    const [showSurveyUpdateModal, setShowSurveyUpdateModal] = useState(false)
    const [surveyInitialVals, setSurveyInitialVals] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        birthDate: '',
        sex: ''
    })

    const fetchData = async (index, size) => {
        /*
          This is the main function that retrieves data from the database ('/survey').
          It is rerun whenever the pageIndex or pageSize are changed. Both are maintained here
          but altered in the PaginatorNav.
        */
        setIsError(false)
        setLoading(true)

        try {
            let result = await axios.get('/survey', {
                params: {
                    page: index,
                    size: size,
                    sort: `${sortField},${sortOrder}`
                }
            })
            let data = result.data.content
            let totalPages = result.data.totalPages
            let totalResultCount = result.data.totalElements

            setData(data)
            window.scrollTo(0, yCoord)
            setPageCount(totalPages)
            setTotalResults(totalResultCount)
            setLoading(false)
            setPaginatorState(totalPages)

        } catch (error) {
            setErrorResponse(error)
            setIsError(true)
        }
    }

    /**
     * PAGINATION FUNCTIONS
     * For maintinaing and updating pagination state
     *  */
    const setPaginatorState = (pageCount) => {
        if ((pageIndex == pageCount) && pageCount == 1) {
            setCanPreviousPage(false)
            setCanNextPage(false)
        } else if (pageIndex == 1) {
            setCanPreviousPage(false)
            setCanNextPage(true)
        } else if (pageIndex == pageCount) {
            setCanNextPage(false)
            setCanPreviousPage(true)
        } else {
            setCanNextPage(true)
            setCanPreviousPage(true)
        }
    }

    const firstPage = () => {
        setPageIndex(1)
    }
    const lastPage = () => {
        setPageIndex(pageCount)
    }
    const previousPage = () => {
        if (pageIndex != 0) {
            setPageIndex(prevState => {
                return (prevState - 1)
            })
        }
    }

    const nextPage = () => {
        setPageIndex(prevState => {
            return (prevState + 1)
        })
    }

    const changePageSize = (selectedPageSize) => {
        setPageSize(selectedPageSize)
        setPageIndex(1)
    }

    //
    const closeErrorModal = () => {
        setIsError(false)
    }
    // Updates the information when pagesize or page index changes

    useEffect(async () => {
        await fetchData(pageIndex, pageSize, sortField, sortOrder)

        function saveTableState() {
            localStorage.setItem("pageIndex", `${pageIndex}`)
            localStorage.setItem("pageSize", `${pageSize}`)
            localStorage.setItem("sortOrder", `${sortOrder}`)
            localStorage.setItem("sortField", `${sortField}`)
        }

        saveTableState()
    }, [pageSize, pageIndex, sortField, sortOrder])


    return (
        <div>
            <SurveyList
                columns={columns}
                data={data}
                loading={loading}
                totalResults={totalResults}
                setSortField={setSortField}
                setSortOrder={setSortOrder}
                sortOrder={sortOrder}
                sortField={sortField}
                setShowSurveyUpdateModal={setShowSurveyUpdateModal}
                setSurveyInitialVals={setSurveyInitialVals}
            />
            <PaginatorNav
                pageIndex={pageIndex}
                pageCount={pageCount}
                previousPage={previousPage}
                nextPage={nextPage}
                changePageSize={changePageSize}
                firstPage={firstPage}
                lastPage={lastPage}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                loading={loading}
                pageSize={pageSize}
            />
            <SurveyUpdateModal showSurveyUpdateModal={showSurveyUpdateModal} toggleModal={setShowSurveyUpdateModal}
                               surveyInitialVals={surveyInitialVals}/>

            <ErrorModal closeErrorModal={closeErrorModal} errorResponse={errorResponse} isError={isError}/>
        </div>
    )
}
export default ProcessSurveys

