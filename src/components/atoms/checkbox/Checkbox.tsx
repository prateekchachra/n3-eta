import React, { ChangeEventHandler } from 'react'

import './CheckBox.scss';

type checkBoxProps = {
    id: string;
    name: string;
    value: string;
    label: string;
    onChange: ChangeEventHandler;
}
const CheckBox= ({id, name, value, label, onChange}: checkBoxProps) => {
    return (
        <div className="checkboxWrapper">
            <input id={id} name={name} type="checkbox" value={value} onChange={(event: any) => onChange(event.target.value)}/>
            <label>{label}</label>
        </div>
    );
}

export default CheckBox;
