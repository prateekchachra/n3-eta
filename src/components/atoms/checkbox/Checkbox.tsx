import React, {ChangeEvent} from 'react';

import './checkbox.scss';

export type CheckBoxProps = {
    id: string,
    name: string,
    value: string,
    label: string,
    onChange: (val: boolean) => void,
}

const Checkbox = ({id, name, value, label, onChange}: CheckBoxProps) : JSX.Element => {

    const onCheckboxChange = (e: ChangeEvent) => {
                
        const {target} = e;
        if(target)
        onChange((target as HTMLInputElement).value === 'checked' ? true : false)
        
        }
        
    return (
        <div className="checkboxWrapper">
            <input id={id} name={name} onChange={onCheckboxChange} type="checkbox" value={value}/>
            <label>{label}</label>
        </div>
    );
}

export default Checkbox;
