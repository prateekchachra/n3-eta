import React, { useState } from 'react';
import './ConfirmationModal.scss';   
import Modal from '../../../molecules/modal/Modal';
import Button from '../../../molecules/button/Button';
import { useIntl } from 'react-intl';

export type ConfirmationModalProps = {
    show: boolean,
    onHide: () => void,
    descriptionText: string,
    label: string,
    onPressConfirm: () => void,
}

const ConfirmationModal = ({show, onHide, descriptionText, label, onPressConfirm} : ConfirmationModalProps) :JSX.Element => {
    

    const {formatMessage} = useIntl();
    
    const renderFooterComponent = () => {
      return(  <Button type="contained" secondary label={formatMessage({id: 'close'})} onClick={onHide} />)
  }
        
    
    return (
        <Modal 
            title={formatMessage({id: 'confirm'})}
            show={show}
            footer={renderFooterComponent()}
            onHide={onHide}>
               <div className="confirmModalContainer">
                <span>{descriptionText}</span> 
                <div className="confirmButtonWrapper">
                    <Button type="contained" primary label={label} onClick={onPressConfirm} />
                 </div>
            </div> 
        </Modal>
    );
}

export default ConfirmationModal;