import React from 'react';

import './productCard.scss';

export type ProductCardProps = {
    productTitle: string;
    price: number;
    discountPrice: number;
    
}

const ProductCard = ({productTitle, price, discountPrice = 0} : ProductCardProps): JSX.Element => {
    return (
        <div className="productCardWrapper">
            <div className="productCardImageCarousel">

            </div>
            <div className="productCardText">
                <div>
                    {productTitle}
                </div>
                <div>
                    {price} - {discountPrice}
                </div>
            </div>
            <div className="productCardActions">

            </div>
        </div>
    );
}

export default ProductCard;