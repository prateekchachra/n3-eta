import React, { ChangeEvent,  SyntheticEvent,  useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import './AddAddressModal.scss';   
import Modal from '../../../molecules/modal/Modal';
import Button from '../../../molecules/button/Button';
import TypeSelector from '../../TypeSelector/TypeSelector';
import { FormattedMessage, useIntl } from 'react-intl';
import { AddressType } from '../../Address/Address';


export type AddAddressModalProps = {
    show: boolean,
    onHide: () => void,
    onAddClick: (address: AddressType) => void,
    isFirstAddress?: boolean,
}

const ADDRESS_TYPES = ["Home", "Office", "Others"]

const AddAddressModal = ({show, onHide, onAddClick, isFirstAddress} : AddAddressModalProps) :JSX.Element => {
    
  const {formatMessage} = useIntl();

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [pin, setPin] = useState('')
    const [addressDetail, setAddressDetail] = useState('')
    const [locality, setLocality] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [typeOfAddress, setTypeOfAddress] = useState('')


    const onNameChange = (event: ChangeEvent) => {
        const {target} = event;
        setName((target as HTMLInputElement).value)
    }
    const onPhoneChange = (event: ChangeEvent) => {
        const {target} = event;
        setPhone((target as HTMLInputElement).value)
    }
    const onPinChange = (event: ChangeEvent) => {
        const {target} = event;
        setPin((target as HTMLInputElement).value)
    }
    const onMainChange = (event: ChangeEvent) => {
        const {target} = event;
        setAddressDetail((target as HTMLInputElement).value)
    }
    const onLocalityChange = (event: ChangeEvent) => {
        const {target} = event;
        setLocality((target as HTMLInputElement).value)
    }
    const onCityChange = (event: ChangeEvent) => {
        const {target} = event;
        setCity((target as HTMLInputElement).value)
    }
    const onStateChange = (event: ChangeEvent) => {
        const {target} = event;
        setState((target as HTMLInputElement).value)
    }


  const onAddAddressClick = (event: SyntheticEvent) => {
        event.preventDefault();
        onAddClick({
            name,
            phone,
            pin,
            addressDetail,
            locality,
            city,
            state,
            typeOfAddress,
            default : isFirstAddress ? true : false,
        });
        onHide();
    }


    return (
        <Modal 
            title={formatMessage({id: 'add_address'})}
            show={show}
            onHide={onHide}>
                <Form className="formContainer">
        <Form.Group controlId="form.Name">
            <Form.Label><FormattedMessage id="name"/></Form.Label>
            <Form.Control type="text" onChange={onNameChange} placeholder={formatMessage({id: 'name'})} />
        </Form.Group>
        <Form.Group controlId="form.Mobile">
            <Form.Label><FormattedMessage id="mobile"/></Form.Label>
            <Form.Control type="number"  onChange={onPhoneChange} placeholder={formatMessage({id: 'mobile_placeholder'})} />
        </Form.Group>
        
        <Form.Group controlId="form.Address">
            <Form.Label><FormattedMessage id="address"/></Form.Label>
            <Form.Control type="number" onChange={onPinChange} placeholder={formatMessage({id: 'pin_placeholder'})} />
            <Form.Control type="text" onChange={onMainChange} placeholder={formatMessage({id: 'add_main_placeholder'})} />
            <Form.Control type="text" onChange={onLocalityChange} placeholder={formatMessage({id: 'locality_placeholder'})} />
            <Row>
                <Col>
                <Form.Control type="text" onChange={onCityChange} placeholder={formatMessage({id: 'city_placeholder'})} />
                </Col>
                <Col>
                <Form.Control type="text" onChange={onStateChange} placeholder={formatMessage({id: 'state_placeholder'})} />
                </Col>
            </Row>

        </Form.Group>
        <Form.Group controlId="form.SaveAs">
            <Form.Label><FormattedMessage id="save_address"/></Form.Label>
            <TypeSelector label="" values={ADDRESS_TYPES} onSelectedChange={(value) => setTypeOfAddress(value)} />
        </Form.Group>
        <Form.Group controlId="form.Submit">
          
        </Form.Group>
        <Button type="contained" secondary label={formatMessage({id: 'submit_address'})} onClick={onAddAddressClick} />
          
      </Form>
      
        </Modal>
    );
}

export default AddAddressModal;