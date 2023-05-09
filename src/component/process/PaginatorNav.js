import React from 'react'
import { mdiChevronDoubleLeft, mdiChevronDoubleRight, mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import SearchBySurveyId from './SearchBySurveyId'

const PaginatorNav = ({
    previousPage, nextPage, pageIndex, pageCount, changePageSize, firstPage, loading, lastPage, canPreviousPage, canNextPage, pageSize
}) => {
    return (
        <div className={'card-footer sticky-paginator p-2'}>
            <nav aria-label="Page navigation">
                <div className={'row'}> 
                    <div className={'col md-4 d-flex align-items-center'}>
                        <ul className="pagination mb-0">
                            <li className="page-item">
                                <button className="pointer-hover page-link" title="Beginning"
                                    aria-label="Beginning" onClick={firstPage}
                                    disabled={!canPreviousPage}>
                                    <Icon size={'1rem'} path={mdiChevronDoubleLeft} />
                                </button>
                            </li>
                            <li className="page-item">
                                <button className="pointer-hover page-link" title="Previous"
                                    aria-label="Previous" onClick={previousPage}
                                    disabled={!canPreviousPage}>
                                    <Icon size={'1rem'} path={mdiChevronLeft} />
                                </button>
                            </li>

                            <li className="page-item">
                                <button className="pointer-hover page-link" title="Next"
                                    aria-label="Next" onClick={nextPage}
                                    disabled={!canNextPage}>
                                    <Icon size={'1rem'} path={mdiChevronRight} />
                                </button>
                            </li>
                            <li className="page-item">
                                <button className="pointer-hover page-link" title="End"
                                    aria-label="End" onClick={lastPage}
                                    disabled={!canNextPage}>
                                    <Icon size={'1rem'} path={mdiChevronDoubleRight} />
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex align-items-center">
                        {loading ?
                            "Loading Results..."
                            :
                            `Page ${pageIndex} of ${pageCount}`
                        }
                    </div>
                    <div className={'col'}>

                        <SearchBySurveyId />

                    </div>

                    <div className={'col d-flex align-items-center'}>
                        <select onChange={(event) => changePageSize(+event.target.value)} value={pageSize} className={'form-control'}                        >
                            {[10, 20, 30, 40, 50, 100, 300].map(pageSizeCount => (
                                <option key={pageSizeCount} value={pageSizeCount} >
                                    Show {pageSizeCount} per page
                                </option>
                            ))}
                        </select></div>
                </div>
            </nav>
        </div >
    )
}


export default PaginatorNav