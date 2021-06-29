import React from 'react';


import './textInput.scss';

type textInputProps = {
    placeholder: string,
    onChangeText: any
}


const TextInput = ({ placeholder, onChangeText} : textInputProps) => {

    return (
            <input type="text" className="textInput" onChange={(event: any) => onChangeText(event.target.value)} placeholder={placeholder} />
    )
} 

export default TextInput;