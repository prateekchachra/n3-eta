import React from 'react';

import './radioButton.scss';

interface Props {
    id: string;
    name: string;
    value: string;
    label: string;
}

const RadioButton : React.FunctionComponent<Props> = (props) => {
    return (
        <div className="radioButtonWrapper">
            <input id={props.id} name={props.name} type="radio" value={props.value}/>
            <label>{props.label}</label>
        </div>
    );
}

export default RadioButton;