import React, {useState} from 'react';

import './filters.scss';
import Checkbox from '../../atoms/CheckBox/Checkbox';


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

    const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);


    const onCheckboxChange = (value: boolean, index: number) => {
        if(options[index]) {
            options[index].value = value;
        }
        setFilterOptions(options);
        
        onSelect(options);
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