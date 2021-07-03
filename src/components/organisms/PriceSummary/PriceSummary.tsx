import React from 'react';

import Button from '../../../components/molecules/button/Button';
import { ProductModel } from '../../../redux/cart/CartReducer';
import CartItem from '../CartItem/CartItem';
import './PriceSummary.scss';


export type PriceSummaryProps = {
    buttonLabel: string,
    onButtonClick: () => void,
    cartItems?: ProductModel[],
    onDeleteClick?: () => void,
    onAddRemoveItemClick?: () => void,

}


const PriceSummary = ({onButtonClick, cartItems, buttonLabel, onDeleteClick,onAddRemoveItemClick} : PriceSummaryProps) : JSX.Element => {

    const renderCartItems = (): JSX.Element => {
        if(cartItems){
            return (
                <>
                {cartItems.map((item,index) => {
                    return (
                        <CartItem 
                        key={item.id.toString()}
                        product={item}
                        onDeleteClick={onDeleteClick}
                        onAddRemoveItemClick={onAddRemoveItemClick}
                        />
                    )
                })}
                </>
            )
        }
        else return (<></>);
    }

    return (
        <div className="cartContainer">
        <span className="cartLabel">Price Details</span>
        {renderCartItems()}
        <div className="itemContainer">
            <span className="cartItemLabel">Price (3 items)</span>
            <span className="cartValue">₹210</span>
        </div>
        <div className="itemContainer">
            <span className="cartItemLabel">Discount</span> 
            <span className="cartDiscountValue">-₹50</span>
        </div>
        <div className="itemContainer">
            <span className="cartItemLabel">Delivery Charges</span>
            <span className="cartDiscountValue">Free</span>
        </div>
        <div className="itemContainer totalContainer">
            <span className="cartItemLabel cartTotalLabel">Total</span>
            <span className="cartTotalValue">₹160</span>
        </div>

        <Button type="contained" secondary label={buttonLabel} onClick={onButtonClick} />
    </div>
    )
}
export default PriceSummary;