import React, { ReactNodeArray, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from '../../api/axios';
import { FormattedMessage } from "react-intl";
import { toast } from 'react-toastify';
import './HomePage.scss';

import PageTemplate from '../../components/templates/PageTemplate';
import ImageSlider from '../../components/molecules/ImageSlider/ImageSlider';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';
import { ProductModel } from '../../redux/cart/CartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { addProductinToCart, addProductinToWishlist } from '../../redux/user/UserActions';
import { RootState } from '../../store';

import { heroBanner } from '../../assets/images';
import { showLoginModal } from '../../redux/loginModal/LoginModalActions';
import BuyNowModal from '../../components/organisms/modals/BuyNowModal/BuyNowModal';
import AddToCartModal from '../../components/organisms/modals/AddToCartModal/AddToCardModal';



const HomePage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    
    const [productList, setProductList] = useState<ProductModel[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
    const [showBuyNow, setShowBuyNow] = useState<boolean>(false);
    const [showAddToCart, setShowAddToCart] = useState<boolean>(false);

    const userState = useSelector<RootState , RootState["userState"]>((state: RootState) => state.userState);
    const wishlistItems = useSelector<RootState, RootState["wishlistState"]>((state: RootState) => state.wishlistState).wishlistItems;
    const banners = [
        heroBanner
      ];
    const specialCategoriesKeys = ["knockout_deals", "festive_deals", "deals_of_day"];
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

    function onBuyNowHandler(product: ProductModel){
        setSelectedProduct(product);
        setShowBuyNow(true);        
    }

    function onAddToCartHandler(product: ProductModel){
        setSelectedProduct(product);
        setShowAddToCart(true);
    }

    function onAddtoCartClickHandler(size: string, color: string) {
        dispatch(addProductinToCart(Object.assign({}, selectedProduct, 
            {quantity: 1, size, color})));
        
        toast('Item added to cart!', {
            type: 'success'
        })
        setShowAddToCart(false);
    }

    function onBuyNowClickHandler(size: string, color: string) {
        if(!userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return;
        }
        if(userState.isUserLoggedIn && selectedProduct) {
            dispatch(addProductinToCart(Object.assign({}, selectedProduct, 
                {quantity: 1, size, color})));
            history.push("/cart");
        }
    }


    const onAddToWishlistHandler = (product: ProductModel) => {
        
        dispatch(addProductinToWishlist(product));
    }

    const onBuyNowHide = () => {
        setShowBuyNow(false)
        setSelectedProduct(null);
    };
    const onAddToCartHide = () => {
        setShowAddToCart(false);
        setSelectedProduct(null);
    }
    
    //TODO: add 'listOfProductsByCategoryMap' as an arg, iterator through each item
    function renderProductListColumns() {
        const productListColumnRendererArray: ReactNodeArray = [];
        specialCategoriesKeys.forEach(element => {
            productListColumnRendererArray.push(
                <div className="productListColumnContainer" key={element}>
                    <div className="textBannerContainer">
                        <h4 className="textBannerTitle"><FormattedMessage id={element} /></h4>
                        <h4 
                            className="textBannerTitleLink"
                            onClick={() => onViewAllClickHandler()}
                        >
                            <FormattedMessage id="view_all" />
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
                                    buyNowHandler={(e) => onBuyNowHandler(product)} 
                                    addToCartHandler={(e) => onAddToCartHandler(product)}
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

                <BuyNowModal 
                    show={showBuyNow}
                    onHide={onBuyNowHide}
                    onBuyClick={onBuyNowClickHandler}
                />
                <AddToCartModal 
                    show={showAddToCart}
                    onHide={onAddToCartHide}
                    onAddClick={onAddtoCartClickHandler}
                    />
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
