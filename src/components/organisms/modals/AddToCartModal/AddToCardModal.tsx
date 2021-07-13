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
import { toast } from 'react-toastify';
import QuantityInput from '../../../atoms/QuantityInput/QuantityInput';


export type AddToCartModalProps = {
    show: boolean,
    onHide: () => void,
    onAddClick: (size: string, color: string, quantity: number) => void,
    onBuyNowClick: (size: string, color: string, quantity: number) => void,
}

const AddToCartModal = ({show, onHide, onAddClick, onBuyNowClick} : AddToCartModalProps) :JSX.Element => {
    
    const [size, setSize] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    
    const {formatMessage} = useIntl();
    
   
    const onBuyButtonClick = () =>  {
        if(size === '' || color === ''){
            toast('Please select a size and color',
            {type: 'error'})
        }
        else onBuyNowClick(size, color, quantity)
     }
    const onAddButtonClick = () =>  {
        if(size === '' || color === ''){
            toast('Please select a size and color',
            {type: 'error'})
        }
      
        else onAddClick(size, color, quantity)
     }
     
    const onChangeQuantity = (value: number) => setQuantity(value);

    return (
        <Modal 
            title={formatMessage({id: 'add_to_cart'})}
            show={show}
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
                <QuantityInput 
                    sendBackQuantity={onChangeQuantity}
                />
                <div className="buttonsContainer">
                    <div className="buttonWrapper">
                        <Button type="contained" primary label={formatMessage({id: 'buy_now'})} onClick={onBuyButtonClick} />
                    </div>
                    <div className="buttonWrapper">
                        <Button type="contained" secondary label={formatMessage({id: 'add_to_cart'})} onClick={onAddButtonClick} />
                    </div>  
                 </div>
            </div> 
        </Modal>
    );
}

export default AddToCartModal;