import React from 'react';
import {Modal as BModal} from 'react-bootstrap';



import './Modal.scss';


export type ModalProps = {
    title: string,
    show: boolean,
    onHide: () => void,
    children: JSX.Element,
    footer:JSX.Element,
}


const Modal = ({show, title, onHide,children, footer} : ModalProps) : JSX.Element => {

    
    return (
        <BModal
        show={show}
        onHide={onHide}
        size="lg"
        contentClassName="modalContainer"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      > <div className="modalInnerContainer">
        <BModal.Header closeButton id="contained-modal-header">
          <BModal.Title id="contained-modal-title-vcenter">
           {title}
          </BModal.Title>
        </BModal.Header>
        <BModal.Body>
          {children}
        </BModal.Body>
        <BModal.Footer>
         {footer}
        </BModal.Footer>
        </div>
      </BModal>
    )
}
export default Modal;