import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import './BuyNowModal.scss';   
import Modal from '../../../molecules/modal/Modal';
import Button from '../../../molecules/button/Button';
import ColorSelector from '../../colorSelector/ColorSelector';
import SizeSelector from '../../sizeSelector/SizeSelector';
import { FormattedMessage, useIntl } from 'react-intl';
import { COLOR_SELECTOR_OPTIONS, SIZE_SELECTOR_OPTIONS } from '../../../../constants/staticData';


export type BuyNowModalProps = {
    show: boolean,
    onHide: () => void,
    onBuyClick: (size: string, color: string) => void,
}

const BuyNowModal = ({show, onHide, onBuyClick} : BuyNowModalProps) :JSX.Element => {
    
  const {formatMessage} = useIntl();

  const [size, setSize] = useState<string>('');
  const [color, setColor] = useState<string>('');
  

  const renderFooterComponent = () => {
      return(  <Button type="contained" secondary label={formatMessage({id: 'close'})} onClick={onHide} />)
  }
    
    
    return (
        <Modal 
            title={formatMessage({id: 'buy_now'})}
            show={show}
            footer={renderFooterComponent()}
            onHide={onHide}>
               <div className="buyNowContainer">
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
                <div className="buyNowButtonWrapper">
                    <Button type="contained"  primary label={formatMessage({id: 'buy_now'})} onClick={() => onBuyClick(size, color)} />
                 </div>
            </div> 
        </Modal>
    );
}

export default BuyNowModal;