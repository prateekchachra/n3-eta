import React, { ChangeEvent, MouseEventHandler } from 'react';
import { Row } from 'react-bootstrap';
import './OptionWrapper.scss';   

export type OptionWrapperProps = {
    children: JSX.Element,
    clickable?: boolean,
    onOptionClick?: MouseEventHandler
}



const OptionWrapper = ({children, clickable,onOptionClick} : OptionWrapperProps) :JSX.Element => {
    
    return (
        <div className={`optionWrapper ${clickable ? 'optionClickable' : ''}`}
        onClick={onOptionClick}>
          {children}
        </div>
    );
}

export default OptionWrapper;