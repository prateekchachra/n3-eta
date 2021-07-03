import React from 'react';

import './checkbox.scss';

type checkBoxProps = {
    id: string,
    name: string,
    value: string,
    label: string,
    onChange: any,
}

const Checkbox = ({id, name, value, label, onChange}: checkBoxProps) => {
    return (
        <div className="checkboxWrapper">
            <input id={id} name={name} onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                onChange(e.currentTarget.checked);
            }} type="checkbox" value={value}/>
            <label>{label}</label>
        </div>
    );
}

export default Checkbox;
