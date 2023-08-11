import {Form} from "react-bootstrap"
import {OptionsWithGroup} from "../model/data";

type option = { value: string, text: string }

const SelectDropdownWithOptionGroups = ({
                                            options,
                                            name,
                                            value,
                                            handleChange
                                        }: {
    options: OptionsWithGroup[],
    name: string,
    value?: string,
    handleChange: React.ChangeEventHandler<HTMLSelectElement>
}) => {

    // pushes to a hashmap
    const groupedOptions = new Map<string, option[]>;
    options.forEach(option => {
        if (!groupedOptions.get(option.optionGroup)) groupedOptions.set(option.optionGroup, []);
        groupedOptions.get(option.optionGroup)?.push({
            value: option.text,
            text: option.text
        });
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
    /*const SelectInputRound = ({
                                  defaultOption,
                                  name,
                                  value,
                                  onChange,
                                  groupedOptions
                              }) => {*/
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
                        {renderOptions(groupedOptions.get(group) || [])}
                    </optgroup>
                );
            })}
        </Form.Select>
    );

}
export default SelectDropdownWithOptionGroups;
