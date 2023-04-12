import {useState} from "react";

type OptionsWithGroup=[{
    id:string,
    label:string,
    optionGroup:string
}]
const ReactSelectDropdownWithOptionGroups = ( opts:OptionsWithGroup ) => {
    // Set the initial selected item to the first dropdown option
    const initialOptionId = opts[0].id
    const [selectedOption, setSelectedOption ] = useState(initialOptionId);

    const handleDropdownChange = (event) => {
        const optionId = event.target.value;
        setSelectedOption(optionId);
    }

    const groupedOptions = opts.reduce((acc, option) => {
        const accOptionGroup = acc[option.optionGroup] || [];

        return {
            ...acc,
            [option.optionGroup]: [...accOptionGroup, option]
        }
    }, {});

    return (
        <select value={selectedOption} onChange={handleDropdownChange}>
            {
                Object.keys(groupedOptions).map((optionGroupName) => (
                    <optgroup key={optionGroupName} label={optionGroupName}>
                        {
                            groupedOptions[optionGroupName].map(({ id, name }) => (
                                <option key={name} value={id}>{name}</option>
                            ))
                        }
                    </optgroup>
                ))
            }
        </select>
    );
}
