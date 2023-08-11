import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function CountrySelect({ url, formKey, className, handleCountrySelect, formData, survey }) {

	const [options, setOptions] = useState(null)


	useEffect(() => {
		const fetchData = async (url) => {
			let response = await axios.get(url)
			let optionData = response.data
			// Model data based off of anticipated fields
			optionData = optionData.map((l) => {
				return {
					code: l.code,
					name: `${l.name}`
				}
			})

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
						onChange={handleCountrySelect}
						defaultValue={formData.countryOfBirth ? `${formData.countryOfBirth.name}-${formData.countryOfBirth.code}` : 'None'}
						value={formData.countryOfBirth ? `${formData.countryOfBirth.name}-${formData.countryOfBirth.code}` : 'None'}
					>
						{
							options.map((option) => {
								return (
									<option key={option.code} value={`${option.name}-${option.code}`}>
										{option.name} ({option.code})
									</option>
								)
							})
						}
						< option value="-">None Listed</option>
					</select >
					:
					< select
						className={`form-control col pl-0 ${className}`
						}
						id={formKey}
						onChange={handleCountrySelect}
					>
						< option > {"Loading..."}</option >
					</select>
			}
		</>
	)
}
