import React, { useState, useEffect } from 'react'
import SurveyPDFTemplate from '../survey/assets/SurveyPDFTemplate'
import { Button, Modal, Form, Col } from 'react-bootstrap'
import { PDFDownloadLink } from '@react-pdf/renderer'

export default function PDFModal({ showPDF, data }) {
    return (
        <>
            {showPDF && data !== null ? (
                <PDFDownloadLink
                    className="text-center btn btn-outline-secondary justify-content-center"
                    document={<SurveyPDFTemplate data={data} />}
                    fileName="home_language_survey.pdf"
                >
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : 'Download PDF'
                    }
                </PDFDownloadLink>
            ) : (
                <span></span>
            )}
        </>
    )
}
