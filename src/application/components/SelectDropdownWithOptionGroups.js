import {Form} from "react-bootstrap"

type OptionsWithGroup = [{
    value: string,
    text: string,
    optionGroup: string
}]

const SelectDropdownWithOptionGroups = ({options, name, value, handleChange}) => {

    // pushes to a hashmap
    const groupedOptions = {};
    options.forEach(option => {
        if (!groupedOptions[option.optionGroup]) groupedOptions[option.optionGroup] = [];
        groupedOptions[option.optionGroup].push({
            value: option.value || option.text,
            text: option.text
        });
    });

    const renderOptions = options => {
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
                        {renderOptions(groupedOptions[group])}
                    </optgroup>
                );
            })}
        </Form.Select>
    );

}
export default SelectDropdownWithOptionGroups;
