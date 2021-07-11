import React, { MouseEventHandler } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import './Address.scss';   
import OptionWrapper from '../../molecules/OptionWrapper/OptionWrapper';
import { FormattedMessage } from 'react-intl';

export type AddressType = {
    name: string,
    phone: string,
    pin: string,
    addressDetail: string,
    locality: string
    city: string,
    state: string,
    typeOfAddress: string,
    default?: boolean,
}
export type AddressProps = {
    address: AddressType,
    onRemoveClick?: () => void,
    showSelect?: boolean,
    showSetDefault?: boolean,
    onDefaultRadioClick?: () => void,
    onDeleteClick?: () => void,
}



const Address = ({address, onDefaultRadioClick = () => {console.log('clicked')}, showSelect,onDeleteClick, showSetDefault} : AddressProps) :JSX.Element => {
    
  
    const{name, typeOfAddress,  pin, addressDetail, locality, city, state}=address;
    
    const onDefaultRadioChange = () => {
        if(onDefaultRadioClick){
            onDefaultRadioClick();
        }
          
    }
    return (
        <OptionWrapper>
            <>
            {onDeleteClick ? <span className="deleteButton" onClick={onDeleteClick}>x</span> : null}
            <Row className="addressRow">
                <Col>
                    <div className="addFieldsWrapper">
                        <div className="addFieldWrapper">
                          {showSelect && <Form.Check type="radio" aria-label="radio 1" />}
                            <span className="addressField addressName">{name}</span>
                        </div>
                        <span className="addressField addressDetail">{addressDetail}, {locality}, {city}, ({state})</span>
                        <span className="addressField addressPin">{pin}</span>
                    </div>
                </Col>
                <Col>
                    <span className="addressField addressType">{typeOfAddress}</span>
                </Col>
                
            </Row>
            {showSetDefault &&
             (<Row>
                 <div className="addFieldWrapper">
                    <Form.Check type="radio" aria-label="Default Setter Radio" onChange={onDefaultRadioChange}/>
                    <span className="addressField addressDefault"><FormattedMessage id='set_default_add'/></span>
                </div>
            </Row>)}
            </>
        </OptionWrapper>
    );
}

export default Address;