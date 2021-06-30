import React, { ReactNodeArray } from 'react'
import { useHistory } from 'react-router-dom';

import './HomePage.scss';

import PageTemplate from '../../components/templates/PageTemplate';
import ImageSlider from '../../components/molecules/ImageSlider/ImageSlider';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';

import JsonProductList from '../../assets/sampleData/Products.json';

const banners = [
    "https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  ];

const HomePage = () => {
    const history = useHistory();
    const productList = [...JSON.parse(JSON.stringify(JsonProductList)).products].filter(product => product.isTrending);
    const categories = [...JSON.parse(JSON.stringify(JsonProductList)).categories];
    
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
        categories.forEach(category => {
            productListColumnRendererArray.push(
                <div className="productListColumnContainer" key={category}>
                    <div className="textBannerContainer">
                        <h4 className="textBannerTitle">{category}</h4>
                        <a href="">
                            <h4 className="textBannerTitleLink">View All</h4>
                        </a>
                    </div>
                    <div className="productListContainer">
                        {   productList &&
                            productList.map((product: any) => {

                                return (<ProductCard key={product.id}
                                    productTitle={product.name} 
                                    price={product.price} 
                                    discountPercent={product.discountPercentage} 
                                    imgs={product.images} 
                                    buyNowHandler={(e) => {e.preventDefault(); console.log("Buy Now Clicked")}} 
                                    addToCartHandler={(e) => {
                                        console.log("Add to Cart Clicked");
                                    }}
                                    onClickHandler={onProductCardClickHandler}
                                />)
                            })
                        }
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