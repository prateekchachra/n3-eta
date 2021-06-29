import React, { ReactNodeArray } from 'react'
import { useHistory } from 'react-router-dom';

import './HomePage.scss';

import PageTemplate from '../../components/templates/PageTemplate';
import ImageSlider from '../../components/molecules/ImageSlider/ImageSlider';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';

const banners = [
    "https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  ];

const HomePage = () => {
    const history = useHistory();

    function onProductCardClickHandler(event: any) {
        event.preventDefault();
        history.push("/product-detail");
    }

    function renderBannerColumn() {
        return (
            <div className="bannerColumnContainer">
                <ImageSlider id="heroBanner" name="heroBanner" images={banners} style={{height: "500px"}}/>
            </div>
        );
    }

    //TODO: add 'listOfProductsByCategoryMap' as an arg, iterator through each item
    function renderProductListColumns() {
        const productListColumnRendererArray: ReactNodeArray = [];
        [1,2,3].forEach(element => {
            productListColumnRendererArray.push(
                <div className="productListColumnContainer">
                    <div className="textBannerContainer">
                        <h4 className="textBannerTitle">Categories to bag</h4>
                        <a href="">
                            <h4 className="textBannerTitleLink">View All</h4>
                        </a>
                    </div>
                    <div className="productListContainer">
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => {console.log("Buy Now Clicked")}} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}
                            onClickHandler={onProductCardClickHandler}
                        />
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => {console.log("Buy Now Clicked")}} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}
                        onClickHandler={onProductCardClickHandler}
                        />
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => {console.log("Buy Now Clicked")}} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}
                            onClickHandler={onProductCardClickHandler}
                        />
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => {console.log("Buy Now Clicked")}} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}
                            onClickHandler={onProductCardClickHandler}
                        />
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => {console.log("Buy Now Clicked")}} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}
                            onClickHandler={onProductCardClickHandler}
                        />
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => {console.log("Buy Now Clicked")}} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}
                        onClickHandler={onProductCardClickHandler}
                        />
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => {console.log("Buy Now Clicked")}} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}
                            onClickHandler={onProductCardClickHandler}
                        />
                    </div>
                </div>
            )
        });
        return productListColumnRendererArray;
    }

    function renderBody() {
        return (
            <div className="bodyComponent">
                {renderBannerColumn()}
                {renderProductListColumns()}
            </div>
        )
    }


    return (
        <>
            <PageTemplate bodyComponent={renderBody()}/>
        </>
    )
}

export default HomePage;
