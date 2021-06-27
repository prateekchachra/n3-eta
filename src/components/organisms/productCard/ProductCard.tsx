import React, { MouseEventHandler } from 'react';

import './productCard.scss';

import Button from '../../molecules/button/Button'
import ImageSlider from '../../molecules/ImageSlider/ImageSlider';

export type ProductCardProps = {
    productTitle: string;
    price: number;
    discountPercent?: number;
    imgs: string[];
    buyNowHandler: MouseEventHandler;
    addToCartHandler: MouseEventHandler;
}

function displayPrice(price: number, discountPercent: number) {
    if(discountPercent == 0) {
        return price;
    }
    price = (price * discountPercent) / 100;
    return price;
}

function displayDiscountPrice(price: number, discountPercent: number) {
    if(discountPercent == 0) {
        return 0;
    }
    const discountedPrice = (price - ((price * discountPercent) / 100));
    return discountedPrice;
}


const ProductCard = ({productTitle, price, discountPercent = 0, imgs, buyNowHandler, addToCartHandler} : ProductCardProps) :JSX.Element => {
    return (
        <div className="productCardWrapper">
            <div className="productCardImageCarousel">
                <ImageSlider id="slider" name="slider" images={imgs} style={{ height: "204px"}}/>
            </div>
            <div className="productCardText">
                <div>
                    {productTitle}
                </div>
                <div>
                    <span className="priceWrapper">
                        Rs.{displayPrice(price, discountPercent)}
                    </span>
                    <span className="discountPriceWrapper">
                        Rs.{displayDiscountPrice(price, discountPercent)}
                    </span>
                    <span className="discountPercentageWrapper">
                        ({discountPercent}% Off)
                    </span>
                </div>
            </div>
            <div className="productCardActions">
                <Button label="Buy Now" type="outlined" onClick={(event: any) => buyNowHandler(event)}/>
                <Button label="Add to Cart" type="outlined" onClick={(event: any) => addToCartHandler(event)}/>
            </div>
        </div>
    );
}

export default ProductCard;