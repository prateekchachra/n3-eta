import React, {useState} from 'react';

import './filters.scss';
import Checkbox from '../../atoms/checkBox/Checkbox';


export type FilterOption = {
    value: boolean,
    label: string,
    number: number,

}
export type FilterProps = {
    label: string,
    options: FilterOption[],
    onSelect: (val: FilterOption[]) => void
}
//onchange handlers should be wrapped in useCallback hooks.

const Filters = ({options, label, onSelect} : FilterProps): JSX.Element => {

    const [filterOptions, setFilterOptions] = useState(options);


    const onCheckboxChange = (value: boolean, index: number) => {
        const updatedFilterOptions : FilterOption[] = [...filterOptions]
        updatedFilterOptions[index] = {...filterOptions[index], value}
        setFilterOptions(updatedFilterOptions);
        
        onSelect(updatedFilterOptions);
    }
    function renderFilterOptions() {
        return (
            <div className="filterContainer">
            {options.map((item: FilterOption, index: number) => {

            const {label, value, number} = item;

            const labelStr = `${label} (${number})`
            return (
                <Checkbox
                onChange={(value: boolean) => onCheckboxChange(value, index)}
                key={label} id={label} name={item.label} value={value ? 'checked' : 'unchecked'}
                label={labelStr}/>
            )
            })}
            </div>
        )
    }

    return (
        <div>
            <span className="filterLabel">{label}</span>
            {renderFilterOptions()}
        </div>
    )
}

export default Filters;