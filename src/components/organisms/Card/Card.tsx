import React, { useState, useEffect } from 'react';
import './Card.scss';   
import {Form} from 'react-bootstrap';
import OptionWrapper from '../../molecules/OptionWrapper/OptionWrapper';
import { FormattedMessage } from 'react-intl';

export type CardType = {
    cardNumber: string,
    name: string,
    expiryDate: string,
    cvv: number,
    default?: boolean,
}
export type CardProps = {
    card: CardType,
    showSelect?: boolean,
    showSetDefault?: boolean,
    radioSelected?: boolean,
    onRemoveClick?: () => void,
    onDefaultRadioClick?: () => void,
    onDeleteClick?: () => void,
    onSelectRadioClick?: () => void,
}



const Card = ({card,showSetDefault, showSelect, radioSelected, 
    onDeleteClick,  onDefaultRadioClick = () => {console.log('clicked')}, onSelectRadioClick} : CardProps) :JSX.Element => {
    
  
    const{name, cardNumber, cvv}=card;

    const [selected, setSelected] = useState<boolean>(radioSelected ? radioSelected: false);
    useEffect(() => {
        setSelected(radioSelected ? radioSelected: false);
    }, [radioSelected])
  
    const onDefaultRadioChange = () => {
        if(onDefaultRadioClick){
            onDefaultRadioClick();
        }
          
    }
    return (
        <OptionWrapper>
              <>
              {onDeleteClick ? <span className="deleteButton" onClick={onDeleteClick}>x</span> : null}
                <div className="cardRowWrapper cardFieldWrapper">
                {showSelect && <Form.Check type="radio"
                           aria-label="radio 1" 
                           checked={selected}
                           onChange={onSelectRadioClick}
                           />}
                    <span className="cardField cardName"><FormattedMessage id='name'/>: {name}</span>
                    <span className="cardField"><FormattedMessage id='card_no'/>: XXXX XXXX XXXX {cardNumber.slice(13,16)}</span>
                    <span className="cardField">CVV: {Math.floor(cvv/100)}XX</span>
                </div>
                
                {showSetDefault &&
                (
                    <div className="cardRowWrapper">
                    <Form.Check type="radio" aria-label="Default Card Setter Radio" onChange={onDefaultRadioChange}/>
                    <span className="cardField"><FormattedMessage id='set_default'/></span>
                </div>)}
            </>
        </OptionWrapper>
    );
}

export default Card;