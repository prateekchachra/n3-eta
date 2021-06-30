import React, { MouseEventHandler } from 'react';

import './ProductCard.scss';

import Button from '../../molecules/button/Button'
import ImageSlider from '../../molecules/ImageSlider/ImageSlider';
import { Heart } from 'react-bootstrap-icons';

type ProductCardProps = {
    productTitle: string;
    price: number;
    discountPercent?: number;
    imgs: string[];
    buyNowHandler: MouseEventHandler;
    addToCartHandler: MouseEventHandler;
    onClickHandler: MouseEventHandler;
}



const ProductCard = ({productTitle, price, discountPercent = 0, imgs, buyNowHandler, addToCartHandler, onClickHandler} : ProductCardProps) :JSX.Element => {
    
    function displayPrice() {
        let _price = price;
        if(discountPercent > 0) {
            _price = (price * discountPercent) / 100;
        }
        return (
            <span className="priceWrapper">
                Rs.{_price}
            </span>
        );
    }
    
    function displayDiscountPrice() {
        if(!discountPercent || discountPercent == 0) {
            return (<></>);
        }
        const discountedPrice = (price - ((price * discountPercent) / 100));
        return (
            <>
                <span className="discountPriceWrapper">
                    Rs.{discountedPrice}
                </span>
                <span className="discountPercentageWrapper">
                    ({discountPercent}% Off)
                </span>
            </>
        );
    }

    function renderProductImageSlider() {
        return (
            <div className="productCardImageCarousel" onClick={(event: any) => onClickHandler(event)}>
                <ImageSlider id="slider" name="slider" images={imgs} style={{ height: "204px"}}/>
            </div>
        )
    }

    function renderFavoruiteButton() {
        return (
            <div className="favouriteButtonWrapper">
                <Heart/>
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
                <Button label="Buy Now" type="outlined" onClick={(event: any) => buyNowHandler(event)}/>
                <Button label="Add to Cart" type="outlined" onClick={(event: any) => addToCartHandler(event)}/>
            </div>
        )
    }
    
    return (
        <div className="productCardWrapper">
            { renderProductImageSlider() }
            { renderFavoruiteButton() }
            { renderProductCardText() }
            { renderProductCardActions() }
        </div>
    );
}

export default ProductCard;