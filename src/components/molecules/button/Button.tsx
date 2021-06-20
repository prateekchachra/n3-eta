import React, {MouseEventHandler} from 'react';
import ContainedButton from '../../atoms/containedButton/ContainedButton';
import OutlinedButton from '../../atoms/outlinedButton/OutlinedButton';


export type ButtonProps = {
    label: string,
    type: string,
    onClick: MouseEventHandler,
    primary?: boolean,
    secondary?: boolean
}

export enum ButtonTypes {
    Contained = "contained"
}


const Button = ({label, type, onClick, primary, secondary} : ButtonProps) : JSX.Element => {

    
    function renderButton(){
        if(type === ButtonTypes.Contained){
            return (
                <ContainedButton  label={label} onClick={onClick} primary={primary}
                secondary={secondary}/>
            )
        } else {
            return (
                <OutlinedButton label={label} onClick={onClick} primary={primary}
                secondary={secondary}/>
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