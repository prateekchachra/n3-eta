import React from 'react';

import './filters.scss';
import DropDown from '../../molecules/dropdown/DropDown'


type filterProps = {
    options: [string],
    onSelect: any
}


const Filters = ({options, onSelect} : filterProps) => {
    return (
        <div>
            <DropDown options={options} onSelect={onSelect} />
        </div>
    )
}

export default Filters;