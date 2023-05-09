import React, {useEffect, useState} from 'react'

export default function GradeSelect({url, formKey, className, handleSelect, formData}) {

    const [options, setOptions] = useState(null)

    const formatGradeEntering = (str) => {
        if (str === 'PreK') {
            return "PreK"
        } else if (str === 'K') {
            return "K"
        } else if (str.length === 1) {
            return `0${str}`
        }
    }

    useEffect(() => {
        let gradeOptions = ["PreK", "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((l) => ({
            name: l,
            value: formatGradeEntering(l),
        }))
        setOptions(gradeOptions)
    }, [])

    return (
        <>
            {
                (options && formData) ?
                    < select
                        className={`form-control col pl-0 ${className}`
                        }
                        id={formKey}
                        onChange={handleSelect}
                        value={formData.gradeEntering == (null || undefined) ? " " : formData.gradeEntering}
                    >
                        {options.map((option) => {
                            return (
                                <option key={option.name} value={option.value}>
                                    {option.name}
                                </option>
                            )
                        })}
                        < option value=" "> {"None"}</option>

                    </select>
                    :
                    < select
                        className={`form-control col pl-0 ${className}`
                        }
                        id={formKey}
                    >
                        < option value=" "> {"None"}</option>
                    </select>
            }
        </>
    )
}
