import React, { MouseEventHandler } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import './Address.scss';   
import OptionWrapper from '../../molecules/OptionWrapper/OptionWrapper';


export type AddAddressModalProps = {
    address: number,
    onRemoveClick: () => void,
}



const AddAddressModal = ({address, onRemoveClick} : AddAddressModalProps) :JSX.Element => {
    
  
    
    return (
        <OptionWrapper>
            <Row className="addressRow">
               
            </Row>
            
        </OptionWrapper>
    );
}

export default AddAddressModal;