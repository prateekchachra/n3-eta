import React from 'react';

import Button from '../../../components/molecules/button/Button';
import CartItem from '../CartItem/CartItem';
import { useSelector } from 'react-redux';

import { Table } from 'react-bootstrap';
import './PriceSummary.scss';
import { RootState } from '../../../store';


export type PriceSummaryProps = {
    buttonLabel: string,
    onButtonClick: () => void,
    toRenderCart?: boolean,
    onDeleteClick?: () => void,
    onAddRemoveItemClick?: () => void,

}


const PriceSummary = ({onButtonClick, toRenderCart, buttonLabel, onDeleteClick,onAddRemoveItemClick} : PriceSummaryProps) : JSX.Element => {

    const cartItems = useSelector<RootState, RootState["cartState"]>((state: RootState) => state.cartState).cartItems;
    const calculateDiscountedPrice = (price: number, discountPercent: number) => (price - ((price * discountPercent) / 100));

    let sumTotal = 0;
    let sumDiscount = 0;

    const cartItemsWithDiscount = cartItems.map((item, index) => {
        const {price, discountPercent} = item;
        const discountedPrice =  calculateDiscountedPrice(price, discountPercent);
        sumTotal += price;
        sumDiscount += (price - discountedPrice);
        return {...item, discountedPrice}
        }
    )


    const renderCartItems = (): JSX.Element => {
        if(cartItems){
            return (
                <Table bordered className="priceTable">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                {cartItemsWithDiscount.map((item,index) => {
                    return (
                        <CartItem 
                        key={item.id.toString()}
                        product={item}
                        onDeleteClick={onDeleteClick}
                        onAddRemoveItemClick={onAddRemoveItemClick}
                        />
                    )
                })}
                </tbody>
                </Table>
            )
        }
        else return (<></>);
    }

    return (
        <div className="cartContainer">
        <span className="cartLabel">Price Details</span>
        {toRenderCart ? renderCartItems() : null}
        <div className="itemContainer">
           { <span className="cartItemLabel">Price {cartItems ? `(${cartItems.length} items)` : ''}</span>}
            <span className="cartValue">₹{sumTotal}</span>
        </div>
        <div className="itemContainer">
            <span className="cartItemLabel">Discount</span> 
            <span className="cartDiscountValue">-₹{sumDiscount}</span> 
        </div>
        <div className="itemContainer">
            <span className="cartItemLabel">Delivery Charges</span>
            <span className="cartDiscountValue">Free</span>
        </div>
        <div className="itemContainer totalContainer">
            <span className="cartItemLabel cartTotalLabel">Total</span>
            <span className="cartTotalValue">₹{sumTotal - sumDiscount}</span>
        </div>

        <Button type="contained" secondary label={buttonLabel} onClick={onButtonClick} />
    </div>
    )
}
export default PriceSummary;