import React, { MouseEventHandler } from 'react';
import './Card.scss';   
import {Form} from 'react-bootstrap';
import OptionWrapper from '../../molecules/OptionWrapper/OptionWrapper';

export type CardType = {
    cardNumber: string,
    name: string,
    expiryDate: string,
    cvv: number,
    default?: boolean,
}
export type CardProps = {
    card: CardType,
    onRemoveClick?: () => void,
    showSetDefault?: boolean,
    onDefaultRadioClick?: () => void,
}



const Card = ({card, onDefaultRadioClick = () => {console.log('clicked')}, showSetDefault} : CardProps) :JSX.Element => {
    
  
    const{name, cardNumber, cvv}=card;
    
    const onDefaultRadioChange = () => {
        if(onDefaultRadioClick){
            onDefaultRadioClick();
        }
          
    }
    return (
        <OptionWrapper>
              <>
                <div className="cardRowWrapper cardFieldWrapper">
                    <span className="cardField cardName">Name: {name}</span>
                    <span className="cardField">Card Number: XXXX XXXX XXXX {cardNumber.slice(13,16)}</span>
                    <span className="cardField">CVV: {Math.floor(cvv/100)}XX</span>
                </div>
                
                {showSetDefault &&
                (
                    <div className="cardRowWrapper">
                    <Form.Check type="radio" aria-label="Default Card Setter Radio" onChange={onDefaultRadioChange}/>
                    <span className="cardField">Set As Default</span>
                </div>)}
            </>
        </OptionWrapper>
    );
}

export default Card;