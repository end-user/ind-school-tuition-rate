import React from 'react'

export default function StudentRadio({ type, display, setClassString, formKey, fieldLookupTable, i, handleRadio, formData }) {
    return (
        <>
            {display && type === 'radio' ?
                <div className={`form-control border col p-2 ${setClassString}`} key={i}>
                    {fieldLookupTable[formKey].options.map((option, i) => (
                        <>
                            <input className="mr-1 radio-size" type="radio" id={option} key={option} name={formKey} value={option} onChange={handleRadio} checked={formData[formKey] == option ? "checked" : false} />
                            <label className="mr-5 radio-size align-middle" htmlFor={formKey} key={i}>{option}</label>
                        </>
                    ))}
                </div>
                : null}
        </>
    )
}
