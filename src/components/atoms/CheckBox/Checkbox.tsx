import React from 'react';

import './CheckBox.scss';

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
            <input id={id} name={name} onChange={(e) => onChange(e.target.value === 'checked' ? true : false)} type="checkbox" value={value}/>
            <label>{label}</label>
        </div>
    );
}

export default Checkbox;