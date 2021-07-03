import React, { ReactNodeArray, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from '../../api/axios';

import './HomePage.scss';

import PageTemplate from '../../components/templates/PageTemplate';
import ImageSlider from '../../components/molecules/ImageSlider/ImageSlider';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';
import LoginModal from '../../components/organisms/LoginModal/LoginModal';
import { ProductModel } from '../../redux/cart/CartReducer';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../redux/cart/CartAction';

const banners = [
    "https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  ];

const HomePage = () => {

    const history = useHistory();
    const [displayLogin, setDisplayLogin] = useState(true)
    const dispatch = useDispatch();
    const [productList, setProductList] = useState<ProductModel[]>([]);

    const fetchProductList= async () => {
        const response = await axios.get("/products?_page=1&_limit=6");
        if(response.data) {
            setProductList(response.data);
        }
    }

    useEffect( () => {
        fetchProductList();
    }, []);

    function onProductCardClickHandler(productId: number) {
        history.push(`/item/${productId}`);
    }

    function onAddtoCartButtonClickHandler(productId: number) {
        if(productList) {
            const product: any = productList.find((product: ProductModel) => product.id === productId);
            dispatch(addProductToCart(Object.assign({}, product, {quantity: 1})));
        }
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
                <div className="productListColumnContainer" key={element}>
                    <div className="textBannerContainer">
                        <h4 className="textBannerTitle">Categories to bag</h4>
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
                                    discountPercent={product.discountPercent} 
                                    imgs={product.images} 
                                    buyNowHandler={(e) => {e.preventDefault(); console.log("Buy Now Clicked")}} 
                                    addToCartHandler={(e) => {
                                        console.log("Add to Cart Clicked");
                                        onAddtoCartButtonClickHandler(product.id);
                                    }}
                                    onClickHandler={(event: React.MouseEvent<Element, MouseEvent>) => {
                                        event.preventDefault();
                                        onProductCardClickHandler(product.id);
                                    }}
                                />)
                            })
                        }
                    </div>
                </div>
            )
        });
        return productListColumnRendererArray;
    }


    function renderModal(){
        return ( <LoginModal
            show={displayLogin}
            onHide={() => setDisplayLogin(false)}
           />)
    }
    function renderBody() {
        return (
            <div className="bodyComponent">
                {renderBannerColumn()}
                {renderProductListColumns()}
                {renderModal()}
            </div>
        )
    }


    return (
            <PageTemplate>
                {renderBody()}
            </PageTemplate>
    )
}

export default HomePage;
