import React, { ReactNodeArray, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from '../../api/axios';

import './HomePage.scss';

import PageTemplate from '../../components/templates/PageTemplate';
import ImageSlider from '../../components/molecules/ImageSlider/ImageSlider';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';
import LoginModal from '../../components/organisms/LoginModal/LoginModal';
import { ProductModel } from '../../redux/cart/CartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../../redux/cart/CartAction';
import { RootState } from '../../store';
import { addProductToWishlist } from '../../redux/wishlist/WishlistActions';
import { showLoginModal } from '../../redux/loginModal/LoginModalActions';

const banners = [
    "https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  ];

const HomePage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [productList, setProductList] = useState<ProductModel[]>([]);
    const userState = useSelector<RootState , RootState["userState"]>((state: RootState) => state.userState);
    const wishlistItems = useSelector<RootState, RootState["wishlistState"]>((state: RootState) => state.wishlistState).wishlistItems;

    const fetchProductList= async () => {

        try{
            const response = await axios.get("/products?_page=1&_limit=6");
            if(response.data) {
                setProductList(response.data);
            }

        }catch(err){
            console.log(err)
        }
    }

    useEffect( () => {
        fetchProductList();
    }, []);

    function onProductCardClickHandler(productId: number) {
        history.push(`/item/${productId}`);
    }

    function renderBannerColumn() {
        return (
            <div className="bannerColumnContainer">
                <ImageSlider id="heroBanner" name="heroBanner" images={banners} style={{height: "500px"}}/>
            </div>
        );
    }

    function onAddtoCartButtonClickHandler(product: ProductModel) {

        if(!userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return;
        }

        if(userState.isUserLoggedIn && product) {
            dispatch(addProductToCart(Object.assign({}, product, {quantity: 1})));
        }
    }

    function onBuyNowButtonClickHandler(product: ProductModel | null) {
        if(!userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return;
        }
        if(userState.isUserLoggedIn && product) {
            dispatch(addProductToCart(Object.assign({}, product, {quantity: 1})));
            history.push("/checkout");
        }
    }

    const onAddToWishlistHandler = (product: ProductModel) => {

        if(!userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return;
        }

        if(userState.isUserLoggedIn && product){
            dispatch(addProductToWishlist(Object.assign({}, product)));
        }
        
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

                                const isAddedInWishlist = wishlistItems.filter(item => item.id === product.id).length > 0;
                                return (<ProductCard key={product.id}
                                    productTitle={product.name} 
                                    price={product.price} 
                                    isAddedInWishlist={isAddedInWishlist}
                                     onAddToWishlist={() => onAddToWishlistHandler(product)}
                                    discountPercent={product.discountPercent} 
                                    imgs={product.images} 
                                    buyNowHandler={(e) => onBuyNowButtonClickHandler(product)} 
                                    addToCartHandler={(e) => onAddtoCartButtonClickHandler(product)}
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

    function renderBody() {
        return (
            <div className="bodyComponent">
                {renderBannerColumn()}
                {renderProductListColumns()}
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
