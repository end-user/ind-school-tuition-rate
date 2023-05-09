import React from 'react'
import Select, { createFilter } from 'react-select'

export default function LanguageDropDown({ languages, name, value, setState, isMulti, ...props }) {

	const handleChange = value => {
		if (isMulti) {
			setState(name, value)
		} else {
			setState(name, [value])
		}
	}

	return (
		<>
			{value ?
				<Select
					{...props}
					name={name}
					className="language-drop-down"
					options={languages}
					value={value}
					isMulti={isMulti}
					isClearable={true}
					closeMenuOnSelect={true}
					onChange={handleChange}
					filterOption={createFilter({ matchFrom: 'start' })}
				/>
				:
				<div>Loading...</div>

			}
		</>
	)
}

