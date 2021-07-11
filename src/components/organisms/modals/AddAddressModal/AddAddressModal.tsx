import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import './AddAddressModal.scss';   
import Modal from '../../../molecules/modal/Modal';
import Button from '../../../molecules/button/Button';
import TypeSelector from '../../TypeSelector/TypeSelector';
import { FormattedMessage, useIntl } from 'react-intl';


export type AddAddressModalProps = {
    show: boolean,
    onHide: () => void,
}

const ADDRESS_TYPES = ["Home", "Office", "Others"]

const AddAddressModal = ({show, onHide} : AddAddressModalProps) :JSX.Element => {
    
  const {formatMessage} = useIntl();

  const renderFooterComponent = () => {
      return(  <Button type="contained" secondary label={formatMessage({id: 'close'})} onClick={onHide} />)
  }
    
    
    return (
        <Modal 
            title={formatMessage({id: 'add_address'})}
            show={show}
            footer={renderFooterComponent()}
            onHide={onHide}>
                <Form className="formContainer">
        <Form.Group controlId="form.Name">
            <Form.Label><FormattedMessage id="name"/></Form.Label>
            <Form.Control type="text" placeholder={formatMessage({id: 'name'})} />
        </Form.Group>
        <Form.Group controlId="form.Mobile">
            <Form.Label><FormattedMessage id="mobile"/></Form.Label>
            <Form.Control type="number" placeholder={formatMessage({id: 'mobile_placeholder'})} />
        </Form.Group>
        
        <Form.Group controlId="form.Address">
            <Form.Label><FormattedMessage id="address"/></Form.Label>
            <Form.Control type="number" placeholder={formatMessage({id: 'pin_placeholder'})} />
            <Form.Control type="text" placeholder={formatMessage({id: 'add_main_placeholder'})} />
            <Form.Control type="text" placeholder={formatMessage({id: 'locality_placeholder'})} />
            <Row>
                <Col>
                <Form.Control type="text" placeholder={formatMessage({id: 'city_placeholder'})} />
                </Col>
                <Col>
                <Form.Control type="text" placeholder={formatMessage({id: 'state_placeholder'})} />
                </Col>
            </Row>

        </Form.Group>
        <Form.Group controlId="form.SaveAs">
            <Form.Label><FormattedMessage id="save_address"/></Form.Label>
            <TypeSelector label="" values={ADDRESS_TYPES} onSelectedChange={() => {console.log('')}} />
        </Form.Group>
        <Form.Group controlId="form.Submit">
          
        </Form.Group>
        <Button type="contained" secondary label={formatMessage({id: 'submit_address'})} onClick={() => {onHide()}} />
          
      </Form>
      
        </Modal>
    );
}

export default AddAddressModal;