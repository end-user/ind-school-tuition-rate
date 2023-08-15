import {Form} from "react-bootstrap"
import {OptionsWithGroup} from "../model/data";

type option = { value: string, text: string }

interface groupedOptions {
    [key: string]: option[]
}

const SelectDropdownWithOptionGroups = ({
                                            options,
                                            name,
                                            value,
                                            handleChange
                                        }: {
    options: OptionsWithGroup[],
    name: string,
    value?: string,
    handleChange: any
}) => {

    // pushes to a hashmap
    const groupedOptions: groupedOptions = {};
    options.forEach(option => {
        if (!groupedOptions[option.optionGroup]) {
            groupedOptions[option.optionGroup] = []
        } else {
            groupedOptions[option.optionGroup]?.push({
                value: option.text,
                text: option.text
            })
        }
    });

    const renderOptions = (options: option[]) => {
        return options.map(option => {
            return (
                <option key={option.value} value={option.value}>
                    {option.text}
                </option>
            );
        });
    };

    return (
        <Form.Select
            id={name}
            className="inputSelectRound form-control override-fc"
            name={name}
            value={value}

            onChange={handleChange}
        >
            {Object.keys(groupedOptions).map((group, index) => {
                return (
                    <optgroup key={index} label={group}>
                        {renderOptions(groupedOptions[group])}
                    </optgroup>
                );
            })}
        </Form.Select>
    );

}
export default SelectDropdownWithOptionGroups;
