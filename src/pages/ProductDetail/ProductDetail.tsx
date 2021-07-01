import React from 'react';

import './ProductDetail.scss';

import PageTemplate from '../../components/templates/PageTemplate';
import ImageSlider from '../../components/molecules/ImageSlider/ImageSlider';

import JsonProductList from '../../assets/sampleData/Products.json';
import { useParams } from 'react-router-dom';
import SizeSelector from '../../components/organisms/sizeSelector/SizeSelector';
import ColorSelector from '../../components/organisms/colorSelector/ColorSelector';

const SIZE_SELECTOR_OPTIONS = ['39', '40', '41', '42'];
const COLOR_SELECTOR_OPTIONS = ['turqoise', 'blue', 'green', 'yellow']

function ProductDetailPage() {

    const {productId} = useParams<Record<string, string | undefined>>();
    const product = [...JSON.parse(JSON.stringify(JsonProductList))].find(product => (product.id.toString() === productId));
    

    function renderBody() {

        function displayPrice() {
            let _price = product.price;
            if(product.discountPercent > 0) {
                _price = (product.price * product.discountPercent) / 100;
            }
            return (
                <span className="productPriceWrapper">
                    Rs.{_price}
                </span>
            );
        }
        
        function displayDiscountPrice() {
            if(!product.discountPercent || product.discountPercent == 0) {
                return (<></>);
            }
            const discountedPrice = (product.price - ((product.price * product.discountPercent) / 100));
            return (
                <>
                    <span className="productDiscountPriceWrapper">
                        Rs.{discountedPrice}
                    </span>
                    <span className="productDiscountPercentageWrapper">
                        ({product.discountPercent}% Off)
                    </span>
                </>
            );
        }

        console.log(product);
        return (
            <div className="productDetailComponent">
                <div className="productImageSliderContainer">
                    <ImageSlider
                        id={product.id}
                        name={product.name}
                        images={product.images} 
                        style={{ height: "504px"}}
                    />
                </div>
                <div className="productDetailContainer">
                    <div className="productTitleWrapper">
                        <h2 className="productTitle">{product.name}</h2>
                    </div>
                    <div className="productDiscriptionWrapper">
                        <h4 className="productDiscritpion">{product.name}</h4>
                    </div>
                    <div className="productDetailPriceWrapper">
                        {displayPrice()}
                        {displayDiscountPrice()}
                    </div>
                    <div className="productPriceInclusiveAllTaxesWrapper">
                        <span className="productPriceInclusiveAllTaxes">inclusive of all taxes</span>
                    </div>
                    <div className="productSizeSelectorWrapper">
                        <SizeSelector
                            label="select size"
                            values={SIZE_SELECTOR_OPTIONS}
                            onSelectedChange={(selected) => {
                                console.log(selected);
                                product.size = selected;
                            }}
                        />
                    </div>
                    <div className="productColorSelectorWrapper">
                        <ColorSelector
                            label="select size"
                            values={COLOR_SELECTOR_OPTIONS}
                            onSelectedChange={(selected) => {
                                console.log(selected);
                                product.color = selected;
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }


    return (
            <PageTemplate>{renderBody()}</PageTemplate>
    )
}

export default ProductDetailPage;
