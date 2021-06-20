import React from 'react';

import './radioButton.scss';

export type RadioButtonProps = {
    id: string;
    name: string;
    value: string;
    label: string;
}

const RadioButton = ({id, name, value, label} : RadioButtonProps) : JSX.Element => {
    return (
        <div className="radioButtonWrapper">
            <input id={id} name={name} type="radio" value={value}/>
            <label>{label}</label>
        </div>
    );
}

export default RadioButton;