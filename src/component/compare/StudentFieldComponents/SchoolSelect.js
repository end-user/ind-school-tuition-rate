import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function SchoolSelect({ url, formKey, className, handleSchoolSelect, formData, survey }) {

    const [options, setOptions] = useState(null)


    useEffect(() => {
        const fetchData = async (url) => {
            let response = await axios.get(url)
            let optionData = response.data
            // Model data based off of anticipated fields
            if (url === '/schools') {
                optionData = optionData.map((l) => {
                    return {
                        code: l.stateId,
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
                        className={`form-control col pl-0 ${className}`
                        }
                        id={formKey}
                        key={formKey}
                        onChange={handleSchoolSelect}
                        value={formData[formKey] === null ? " " : formData[key]}
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
                        < option value=" ">None Listed</option>
                    </select >
                    :
                    < select
                        className={`form-control col pl-0 ${className}`
                        }
                        id={formKey}
                        key={formKey}
                        onChange={handleSchoolSelect}
                    >
                        < option > {"Loading..."}</option >
                    </select>
            }
        </>
    )
}
