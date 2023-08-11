import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { Button } from 'reactstrap'
import LanguageTableInstructions from './components/LanguageTableInstructions'
import Table from 'react-bootstrap/Table'
import LanguageEditModal from '../modals/LanguageEditModal'


export default function LanguageTable() {
    const [langTableArray, setLangTableArray] = useState(null)
    const [languageIndex, setLanguageIndex] = useState(null)
    const [tempSuggestion, setTempSuggestion] = useState(null)
    const [tempSpecificLanguage, setTempSpecificLanguage] = useState(null)
    const [showLangEditModal, setShowLangEditModal] = useState(false)
    const [iso3Languages, setIso3Languages] = useState([])
    const [iso2Languages, setIso2Languages] = useState([])
    const [addingNewRow, setAddingNewRow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get('/crosswalkTable').then(resp => {
            setIsLoading(false)
            setLangTableArray(resp.data)
        }).catch(error => {
            setIsLoading(false)
        })
        axios.get('/public/languages', {
            headers: { "Access-Control-Allow-Origin": "*" }
        }).then(
            (langResponse) => {
                const languages = langResponse.data.map((l) => ({
                    value: l.code, //l.id,
                    label: l.language,
                }));
                setIso2Languages(languages);
                return languages;
            },
            (error) => {
                console.error(error);
            }
        );
        axios
            .get("/public/ISO_639-3", {
                headers: { "Access-Control-Allow-Origin": "*" }
            })
            .then(
                (lang3Response) => {
                    const languages = lang3Response.data.map((l) => ({
                        value: l.id, //l.id,
                        label: l.name,
                    }));
                    setIso3Languages(languages);
                    return languages;
                },
                (error) => {
                    console.error(error);
                }
            );
    }, [])
    const onChangeSpecificLanguage = (values) => {
        setTempSpecificLanguage(values)
    }
    const onChangeSuggestions = (values) => {
        setTempSuggestion(values)
    }


    const editRow = (e) => {
        let specLangIndex = +e.target.dataset.lang_index
        setLanguageIndex(specLangIndex)
        let tempSpecLang = langTableArray[specLangIndex].langCode.toLowerCase()
        let tempSpec = (iso3Languages.filter(option => option.value == tempSpecLang.toLowerCase()))[0]
        setTempSpecificLanguage(tempSpec)

        let tempSugLang = langTableArray[specLangIndex].suggestedLanguage.code.toLowerCase()
        let tempSug = (iso2Languages.filter(option => option.value == tempSugLang.toLowerCase()))[0]
        setTempSuggestion(tempSug)
        setShowLangEditModal(true)

    }

    const addRow = (e) => {
        setAddingNewRow(true)
        setShowLangEditModal(true)
        setTempSpecificLanguage()
        setTempSuggestion()
        setLanguageIndex(langTableArray.length)
    }

    const saveLanguage = () => {
        if (tempSpecificLanguage != null && tempSuggestion != null) {
            let specLang = tempSpecificLanguage.value.toUpperCase()
            let specLangName = tempSpecificLanguage.label
            let sugLang = tempSuggestion.value.toUpperCase()
            let sugLangName = tempSuggestion.label

            if (!addingNewRow) {
                let crossWalkId = langTableArray[languageIndex].id
                // update 
                let payload = { id: crossWalkId, langCode: specLang, name: specLangName, suggestedLanguage: { code: sugLang, language: sugLangName } }
                axios.put('/crosswalkTable', payload).then(() => {
                    alert("submit successful!")
                    setShowLangEditModal(false)
                })
            } else if (tempSpecificLanguage != null && tempSuggestion != null) {
                // update 
                let payload = { id: null, langCode: specLang, name: specLangName, suggestedLanguage: { code: sugLang, language: sugLangName } }
                axios.put('/crosswalkTable', payload).then(() => {
                    alert("submit successful!")
                    setShowLangEditModal(false)
                })
                // {language_id: crossWalkId, language_code: tempSpecificLanguage.value, eden_code:tempSuggestion.value}
            }
        } else {
            alert("Not enough information provided")
        }
    }
    const cancelNewLanguage = () => {
        setShowLangEditModal(false)
        setAddingNewRow(false)
    }

    return (
        <div>
            <h5 className="text-center mb-0 p-2">Language Table</h5>
            <a href="#language-table-instructions" data-toggle="collapse" className="m-0 mb-2 align-self-end" size="sm" >What's this?</a>
            <hr />
            <LanguageTableInstructions />
            {isLoading ?
                <h5 className="text-center mb-0 p-2 alert-warning">Loading...</h5>
                : null}
            <Table responsive striped bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th className="pointer-hover" >Specific Language (ISO 639-3)</th>
                        <th className="pointer-hover" >Suggested Language (ISO 639-2)</th>
                        <th className="pointer-hover" >Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {langTableArray ?
                        langTableArray.map((obj, i) => (

                            <tr key={i} >
                                {obj ?
                                    <>
                                        <td >{obj.name} <em style={{ opacity: '.4' }}>{obj.langCode}</em></td>
                                        <td >{obj.suggestedLanguage.language}  <em style={{ opacity: '.4' }}>{obj.suggestedLanguage.code}</em></td>
                                        <td >
                                            <Button data-lang_index={i} onClick={editRow}>Edit</Button>
                                        </td>
                                    </>
                                    : null}

                            </tr>
                        ))
                        : null
                    }
                </tbody>
            </Table>
            {
                langTableArray ?
                    <LanguageEditModal
                        saveFunction={saveLanguage}
                        cancelFunction={cancelNewLanguage}
                        index={languageIndex}
                        //
                        optionsOne={iso3Languages}
                        setterOne={onChangeSpecificLanguage}
                        tempValueOne={tempSpecificLanguage}
                        //
                        optionsTwo={iso2Languages}
                        setterTwo={onChangeSuggestions}
                        tempValueTwo={tempSuggestion}
                        //
                        show={showLangEditModal} />
                    : null
            }
            <Button onClick={addRow}>Add Language</Button>
        </div >
    )
}
