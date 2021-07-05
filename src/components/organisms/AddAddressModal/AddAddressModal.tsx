import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import './AddAddressModal.scss';   
import Modal from '../../molecules/modal/Modal';
import Button from '../../molecules/button/Button';
import TypeSelector from '../TypeSelector/TypeSelector';


export type AddAddressModalProps = {
    show: boolean,
    onHide: () => void,
}

const ADDRESS_TYPES = ["Home", "Office", "Others"]

const AddAddressModal = ({show, onHide} : AddAddressModalProps) :JSX.Element => {
    
  const renderFooterComponent = () => {
      return(  <Button type="contained" secondary label="Close" onClick={onHide} />)
  }
    
  
    
    return (
        <Modal 
            title="Add Address"
            show={show}
            footer={renderFooterComponent()}
            onHide={onHide}>
                <Form className="formContainer">
        <Form.Group controlId="form.Name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" />
        </Form.Group>
        <Form.Group controlId="form.Mobile">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control type="number" placeholder="Mobile no." />
        </Form.Group>
        
        <Form.Group controlId="form.Address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="number" placeholder="Pin Code*" />
            <Form.Control type="text" placeholder="Address (House no., Building, Street Area)" />
            <Form.Control type="text" placeholder="Locality/Town" />
            <Row>
                <Col>
                <Form.Control type="text" placeholder="City" />
                </Col>
                <Col>
                <Form.Control type="text" placeholder="State*" />
                </Col>
            </Row>

        </Form.Group>
        <Form.Group controlId="form.SaveAs">
            <Form.Label>Save Address As</Form.Label>
            <TypeSelector label="" values={ADDRESS_TYPES} onSelectedChange={() => {console.log('')}} />
        </Form.Group>
        <Form.Group controlId="form.Submit">
          
        </Form.Group>
        <Button type="contained" secondary label="Submit Address" onClick={() => {onHide()}} />
          
      </Form>
      
        </Modal>
    );
}

export default AddAddressModal;