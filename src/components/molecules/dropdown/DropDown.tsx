import React, {ReactEventHandler} from 'react';

import './dropDown.scss';

export type DropDownOption = {
    label: string,
    value: string
}

export type DropDownProps = {
    options: DropDownOption[],
    onSelect: ReactEventHandler,
    selected?: string,
}

const DropDown = ({options, onSelect, selected} : DropDownProps): JSX.Element => {

    return (
        <div>
            <select onChange={onSelect}>
                {options.map((item : DropDownOption) => <option value={item.value} key={item.value} selected={selected === item.value}>{item.label}</option>)}
            </select>
        </div>
    )
}

export default DropDown;