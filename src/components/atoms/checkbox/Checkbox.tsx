import React from 'react';

import './checkbox.scss';


type Props = {//checkBoxProps
    id: string;
    name: string;
    value: string;
    label: string;
}

const Checkbox = (props: Props) => {
    return (
        <div className="checkboxWrapper">
            <input id={props.id} name={props.name} type="checkbox" value={props.value}/>
            <label>{props.label}</label>
        </div>
    );
}

export default Checkbox;
