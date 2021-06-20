import React, {MouseEventHandler} from 'react';
import ContainedButton from '../../atoms/containedButton/ContainedButton';
import OutlinedButton from '../../atoms/outlinedButton/OutlinedButton';


export type ButtonProps = {
    label: string,
    type: string,
    onClick: MouseEventHandler
}

export enum ButtonTypes {
    Contained = "contained"
}


const Button = ({label, type, onClick} : ButtonProps) : JSX.Element => {

    
    function renderButton(){
        if(type === ButtonTypes.Contained){
            return (
                <ContainedButton  label={label} onClick={onClick}/>
            )
        } else {
            return (
                <OutlinedButton label={label} onClick={onClick}/>
            )
        }
    
    }

    return (
        <>
            {renderButton()}
        </>
    )
  
}

export default Button;