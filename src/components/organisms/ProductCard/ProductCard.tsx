import React, { MouseEventHandler } from 'react';
import { useIntl } from 'react-intl';
import './productCard.scss';

import Button from '../../molecules/button/Button'
import ImageSlider from '../../molecules/ImageSlider/ImageSlider';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';

type ProductCardProps = {
    productTitle: string;
    price: number;
    discountPercent?: number;
    imgs: string[];
    addToCartHandler: MouseEventHandler;
    onClickHandler: MouseEventHandler;
    onAddToWishlist?: MouseEventHandler;
    onRemoveFromWishlistClick?: MouseEventHandler;
    isAddedInWishlist?: boolean,
    withoutWishlistActions?: boolean,
}



const ProductCard = ({productTitle, price, discountPercent = 0, onAddToWishlist,
     withoutWishlistActions, isAddedInWishlist, imgs,  addToCartHandler,onRemoveFromWishlistClick, onClickHandler} : ProductCardProps) :JSX.Element => {
    
    const {formatMessage} = useIntl();
    const dispatch = useDispatch();
    function displayPrice() {
        let _price = price;
        if(discountPercent > 0) {
            _price = price - (price * discountPercent) / 100;
        }
        return (
            <span className="priceWrapper">
                ₹{_price}
            </span>
        );
    }
    
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

    function renderProductImageSlider() {
        return imgs && (
            <div className="productCardImageCarousel" onClick={(event: any) => onClickHandler(event)}>
                <ImageSlider id="slider" name="slider" images={imgs} style={{ height: "204px"}}/>
            </div>
        )
    }

    function renderRemoveFromWishlist() {
        return withoutWishlistActions && (
            <span className="removeFromWishlistButton" onClick={onRemoveFromWishlistClick}>x</span>
        )
    }

    function renderFavoriteButton() {
        return (
            <div className="favouriteButtonWrapper">
              {isAddedInWishlist ? <HeartFill onClick={onAddToWishlist}/> : <Heart onClick={onAddToWishlist}/>}
            </div>
        )
    }

    function renderProductCardText() {
        return (
            <div className="productCardText">
                <div className="productTitlebar">
                    {productTitle}
                </div>
                <div className="productPricebar">
                    { displayPrice() }
                    { displayDiscountPrice() }
                </div>
            </div>
        )
    }
    
    function renderProductCardActions() {
        return (
            <div className="productCardActions">
                <Button label={formatMessage({id: 'add_to_cart'})} type="outlined" onClick={(event: any) => addToCartHandler(event)}/>
            </div>
        )
    }
    
    return (
        <div className="productCardWrapper">
            { renderProductImageSlider() }
            { renderRemoveFromWishlist() }
            {withoutWishlistActions ? null : renderFavoriteButton()}
            { renderProductCardText() }
            { renderProductCardActions() }
        </div>
    );
}

export default ProductCard;