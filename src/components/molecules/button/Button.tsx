import React from 'react';
import ContainedButton from '../../atoms/containedButton/ContainedButton';
import OutlinedButton from '../../atoms/outlinedButton/OutlinedButton';


type buttonProps = {
    label: string,
    type: string,
    onClick: any
}


const Button = ({label, type, onClick} : buttonProps) => {

    if(type === 'contained'){
        return (
            <ContainedButton  label={label} onClick={onClick}/>
        )
    }
    else {
        return (
            <OutlinedButton label={label} onClick={onClick}/>
        )
    }
  
}

export default Button;