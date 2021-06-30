import React from 'react';
import Selector from '../../molecules/selector/Selector';

import './Modal.scss';


export type ModalProps = {
    label: string,
    values: string[],
    onSelectedChange: (selected: string) => void,
}


const Modal = ({label, values, onSelectedChange} : ModalProps) : JSX.Element => {

    const renderColor = (item: string) => (
        <span className="colorItem" style={{backgroundColor: item}}></span>
    )
    return (
    <Selector label={label} values={values} 
    onSelectedChange={onSelectedChange} renderItem={renderColor}/>
    )
}
export default Modal;