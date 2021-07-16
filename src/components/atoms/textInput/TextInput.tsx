import React, { ChangeEvent }  from 'react';


import './textInput.scss';

export type TextInputProps = {
    placeholder: string,
    onChangeText: (val: string) => void
}


const TextInput = ({ placeholder, onChangeText} : TextInputProps) : JSX.Element => {

    const onInputChange = (event: ChangeEvent) => {
        const {target} = event;
        if(target){
            onChangeText((target as HTMLInputElement).value);
        }
      }

    return (
            <input type="text" className="textInput" onChange={onInputChange} placeholder={placeholder} />
    )
} 

export default TextInput;