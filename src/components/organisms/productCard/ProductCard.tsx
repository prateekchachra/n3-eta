import React from 'react';

import './productCard.scss';

interface Props {
    productTitle: string;
    price: number;
    discountPrice: number;
    
}

const ProductCard: React.FunctionComponent<Props> = (props) => {
    return (
        <div className="productCardWrapper">
            <div className="productCardImageCarousel">

            </div>
            <div className="productCardText">
                <div>
                    {props.productTitle}
                </div>
                <div>
                    {props.price} - {props.discountPrice}
                </div>
            </div>
            <div className="productCardActions">

            </div>
        </div>
    );
}

export default ProductCard;