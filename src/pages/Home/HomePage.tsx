import React, { ReactNodeArray, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from '../../api/axios';

import './HomePage.scss';

import PageTemplate from '../../components/templates/PageTemplate';
import ImageSlider from '../../components/molecules/ImageSlider/ImageSlider';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';
import { ProductModel } from '../../redux/cart/CartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../../redux/cart/CartAction';
import { RootState } from '../../store';
import { addProductToWishlist } from '../../redux/wishlist/WishlistActions';
import { showLoginModal } from '../../redux/loginModal/LoginModalActions';

import { heroBanner } from '../../assets/images';



const HomePage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [productList, setProductList] = useState<ProductModel[]>([]);
    const userState = useSelector<RootState , RootState["userState"]>((state: RootState) => state.userState);
    const wishlistItems = useSelector<RootState, RootState["wishlistState"]>((state: RootState) => state.wishlistState).wishlistItems;
    const banners = [
        heroBanner
      ];
    const specialCategories = ["Knockout Deals", "Festive Special Deals", "Deals of the Day"];
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

    function onViewAllClickHandler() {
        history.push('/offers/list');
    }

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
        specialCategories.forEach(element => {
            productListColumnRendererArray.push(
                <div className="productListColumnContainer" key={element}>
                    <div className="textBannerContainer">
                        <h4 className="textBannerTitle">{element}</h4>
                        <h4 
                            className="textBannerTitleLink"
                            onClick={() => onViewAllClickHandler()}
                        >
                            View All
                        </h4>
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
