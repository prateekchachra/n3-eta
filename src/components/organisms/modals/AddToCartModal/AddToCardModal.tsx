import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import './AddToCartModal.scss';   
import Modal from '../../../molecules/modal/Modal';
import Button from '../../../molecules/button/Button';
import ColorSelector from '../../colorSelector/ColorSelector';
import SizeSelector from '../../sizeSelector/SizeSelector';
import { FormattedMessage, useIntl } from 'react-intl';
import { ProductModel } from '../../../../redux/cart/CartReducer';
import { COLOR_SELECTOR_OPTIONS, SIZE_SELECTOR_OPTIONS } from '../../../../constants/staticData';


export type AddToCartModalProps = {
    show: boolean,
    onHide: () => void,
    onAddClick: (size: string, color: string) => void,
}

const AddToCartModal = ({show, onHide, onAddClick} : AddToCartModalProps) :JSX.Element => {
    
    const [size, setSize] = useState<string>('');
    const [color, setColor] = useState<string>('');
    
    const {formatMessage} = useIntl();
    
    const renderFooterComponent = () => {
      return(  <Button type="contained" secondary label={formatMessage({id: 'close'})} onClick={onHide} />)
  }
        
    
    return (
        <Modal 
            title={formatMessage({id: 'add_to_cart'})}
            show={show}
            footer={renderFooterComponent()}
            onHide={onHide}>
               <div className="addToCartContainer">
                <SizeSelector
                    label={formatMessage({id: 'select_size'})}
                    values={SIZE_SELECTOR_OPTIONS}
                    onSelectedChange={(selected:string) => setSize(selected)}
                />
                <ColorSelector
                    label={formatMessage({id: 'select_colour'})}
                    values={COLOR_SELECTOR_OPTIONS}
                    onSelectedChange={(selected:string) => setColor(selected)}
                />
                <div className="addToCartButtonWrapper">
                    <Button type="contained" primary label={formatMessage({id: 'add_to_cart'})} onClick={() => onAddClick(size, color)} />
                 </div>
            </div> 
        </Modal>
    );
}

export default AddToCartModal;