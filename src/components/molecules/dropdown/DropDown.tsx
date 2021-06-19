import React from 'react';
import { string } from 'yargs';

import './dropDown.scss';

type option = {
    label: string,
    value: string
}

type dropDownProps = {
    options: [option],
    onSelect: any
}

const DropDown = ({options, onSelect} : dropDownProps) => {

    return (
        <div>
            <select onSelect={onSelect}>
                {options.map((item : any) => <option value={item.value} key={item.value}>{item.label}</option>)}
            </select>
        </div>
    )
}

export default DropDown;