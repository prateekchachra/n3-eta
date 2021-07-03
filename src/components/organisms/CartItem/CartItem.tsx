import React, { MouseEventHandler } from 'react';

import './CartItem.scss';

import Button from '../../molecules/button/Button'
import ImageSlider from '../../molecules/ImageSlider/ImageSlider';
import { Heart } from 'react-bootstrap-icons';
import { ProductModel } from '../../../redux/cart/CartReducer';

type CartItemProps = {
    product: ProductModel,
    onDeleteClick?: () => void,
    onAddRemoveItemClick?: () => void,
}



const CartItem = ({product, onDeleteClick, onAddRemoveItemClick} : CartItemProps) :JSX.Element => {
    
    const { id,name,price,discountPercentage, images, quantity} = product;
    
    function displayDiscountPrice() {
        if(!discountPercentage || discountPercentage == 0) {
            return (<></>);
        }
        const discountedPrice = (price - ((price * discountPercentage) / 100));
        return (
            <>
                <span className="discountPriceWrapper">
                    Rs.{discountedPrice}
                </span>
                <span className="discountPercentageWrapper">
                    ({discountPercentage}% Off)
                </span>
            </>
        );
    }



    function renderFavoriteButton() {
        return (
            <div className="favouriteButtonWrapper">
                <Heart/>
            </div>
        )
    }

    function renderCartItemText() {
        return (
            <div className="CartItemText">
                <div className="productTitlebar">
                    {name}
                </div>
                <div className="productPricebar">
                    { displayDiscountPrice() }
                </div>
            </div>
        )
    }
    
    function renderCartItemActions() {
        return (
            <div className="CartItemActions">
               
            </div>
        )
    }
    
    return (
        <div className="CartItemWrapper">
            { renderFavoriteButton() }
            { renderCartItemText() }
            { renderCartItemActions() }
        </div>
    );
}

export default CartItem;