import Select, { createFilter } from 'react-select'
import { Controller } from 'react-hook-form'
import React from 'react'

const Selector = (props) => {
    const { options, name, error, isSearchable = true } = props
    let isError = false
    let errorMessage = ''
    if (error && error.hasOwnProperty(name)) {
        isError = true
        errorMessage = error[name].message
    }
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: isError ? '#dc3545' : provided.borderColor,
            //paddingRight: "calc(1.5em + .75rem);",
            ...(isError && {
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right calc(.5em + 2rem) center;',
                backgroundSize: 'calc(.75em + .375rem) calc(.75em + .375rem);',
            }),
            // none of react-select's styles are passed to <Control />
            className: 'is-invalid',
        }),
    }
    return (
        <Controller
            as={Select}
            defaultValue={''}
            styles={customStyles}
            name={name}
            options={options}
            isSearchable={isSearchable}
            filterOption={createFilter({ matchFrom: 'start' })}
            {...props}
        />
    )
}
export default Selector
