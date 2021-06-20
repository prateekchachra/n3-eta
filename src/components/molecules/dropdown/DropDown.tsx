import React, {ReactEventHandler} from 'react';

import './dropDown.scss';

export type DropDownOption = {
    label: string,
    value: string
}

export type DropDownProps = {
    options: DropDownOption[],
    onSelect: ReactEventHandler
}

const DropDown = ({options, onSelect} : DropDownProps): JSX.Element => {

    return (
        <div>
            <select onSelect={onSelect}>
                {options.map((item : DropDownOption) => <option value={item.value} key={item.value}>{item.label}</option>)}
            </select>
        </div>
    )
}

export default DropDown;