import React, {useState} from 'react';

import './filters.scss';
import Checkbox from '../../atoms/checkbox/Checkbox'; 



type filterOption = {
    value: boolean,
    label: string,
    number: number,

}
type filterProps = {
    label: string,
    options: [filterOption],
    onSelect: any
}


const Filters = ({options, label, onSelect} : filterProps) => {

    const [filterOptions, setFilterOptions] = useState(options)

    return (
        <div>
            <span className="filterLabel">{label}</span>
            {options.map((item: filterOption, index: number) => {

                const {label, value, number} = item;

                const labelStr = `${label} (${number})`
                return (
                    <Checkbox 
                    onChange={(value: boolean) => {
                        const updatedFilterOptions : [filterOption] = [...filterOptions]
                        updatedFilterOptions[index] = {...filterOptions[index], value}
                        setFilterOptions(updatedFilterOptions);
                        
                        onSelect(updatedFilterOptions);
                    }}
                    key={label} id={label} name={item.label} value={value ? 'checked' : 'unchecked'}
                    label={labelStr}/>
                )
            })}
        </div>
    )
}

export default Filters;