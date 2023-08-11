import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function SelectField({ url, setClass, formKey, className, formData, handleSelect }) {

    const [options, setOptions] = useState(null)


    useEffect(() => {
        const fetchData = async (url) => {
            let response = await axios.get(url)
            let optionData = response.data
            // Model data based off of anticipated fields
            if (url === '/public/schools') {
                optionData = optionData.map((l) => {
                    return {
                        code: l.stateId,
                        name: `${l.name}`
                    }
                })
            }
            if (url === '/countries') {
                optionData = optionData.map((l) => {
                    return {
                        code: l.code,
                        name: `${l.name}`
                    }
                })
            }
            setOptions(optionData)
        }
        if ((url !== null)) {
            fetchData(url)
        }
    }, [url])

    return (
        <>
            {
                (options && formData) ?
                    < select
                        className={`form-control col pl-0 ${setClass(formKey)}`
                        }
                        id={formKey}
                        onChange={handleSelect}
                        defaultValue={formData[formKey] ? `${formData[formKey]}` : 'None'}
                        value={formData[formKey] === null ? " " : formData[formKey]}
                    >
                        {
                            options.map((option) => {
                                return (
                                    <option key={option.code} value={`${option.code}`}>
                                        {option.name} ({option.code})
                                    </option>
                                )
                            })
                        }
                        < option value={" "}>None</option>
                    </select >
                    :
                    < select
                        className={`form-control col pl-0 ${className}`
                        }
                        id={formKey}
                        onChange={handleSelect}
                    >
                        < option > {"Loading..."}</option >
                    </select>
            }
        </>
    )
}
