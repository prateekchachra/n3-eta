import React from 'react';

import './ProductCard.scss';

type ProductCardProps = {
    productTitle: string;
    price: number;
    discountPrice?: number;
    
}

const ProductCard = ({productTitle, price, discountPrice = 0} : ProductCardProps) => {
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