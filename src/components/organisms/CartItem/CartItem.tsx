import React, { MouseEventHandler } from 'react';

import './CartItem.scss';

import Button from '../../molecules/button/Button'
import ImageSlider from '../../molecules/ImageSlider/ImageSlider';
import { X } from 'react-bootstrap-icons';
import { ProductModel } from '../../../redux/cart/CartReducer';

type CartItemProps = {
    product: ProductModel,
    onDeleteClick?: () => void,
    onAddRemoveItemClick?: () => void,
}



const CartItem = ({product, onDeleteClick, onAddRemoveItemClick} : CartItemProps) :JSX.Element => {
    
    const { name,price,images,discountPercent,quantity} = product;
    const discountedPrice = (price - ((price * discountPercent) / 100));

    function displayDiscountPrice() {
        if(!discountPercent || discountPercent == 0) {
            return (<></>);
        }
     
        return (
            <>
                <span className="discountPriceWrapper">
                    ₹{price}
                </span>
                <span className="discountPercentageWrapper">
                    ({discountPercent}% Off)
                </span>
            </>
        );
    }




    function renderCartItemProduct() {
        return (
            <div className="cartItemText">
                <div className="cartImageContainer">
                    <X onClick={onDeleteClick} color="red" className="cartDeleteIcon" size={16}/>
                    <img src={images[0]} className="productImage"/>
                 </div>
                <div className="productTitlebar">
                    {name}
                </div>
                <div className="productPricebar">
                    { displayDiscountPrice() }
                </div>
            </div>
        )
    }
    
    function renderTotal() {
        return (
            <div className="cartTotalContainer">
                <div className="cartPrice">
                    {quantity} x {discountedPrice} = 
                </div>
                <div className="cartTotal">
                    ₹ { quantity * discountedPrice }
                </div>
            </div>
        )
    }
    
    return (
        <tr className="CartItemWrapper">
           <td>{ renderCartItemProduct() }</td>
           <td> { discountedPrice }</td>
           <td>{ quantity }</td>
           <td>{ renderTotal() }</td>
        </tr>
    );
}

export default CartItem;