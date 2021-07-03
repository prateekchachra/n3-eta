import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

import './ProductDetail.scss';

import PageTemplate from '../../components/templates/PageTemplate';
import ImageSlider from '../../components/molecules/ImageSlider/ImageSlider';
import SizeSelector from '../../components/organisms/sizeSelector/SizeSelector';
import ColorSelector from '../../components/organisms/colorSelector/ColorSelector';
import ContainedButton from '../../components/atoms/containedButton/ContainedButton';
import CustomerReview, { CustomerReviewType } from '../../components/organisms/customerReview/CustomerReview';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';

import { ProductModel } from '../../redux/cart/CartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addProductToWishlist } from '../../redux/wishlist/WishlistActions';

const SIZE_SELECTOR_OPTIONS = ['39', '40', '41', '42'];
const COLOR_SELECTOR_OPTIONS = ['turqoise', 'blue', 'green', 'yellow'];
const REVIEW : CustomerReviewType = {
    title: 'This product is awesome',
    text: 'Loved using this product! Every single thing was perfect',
    reviewerName: 'Prateek',
    date: '20 Dec 2017',
    score: 3
  }

function ProductDetailPage() {

    const {productId} = useParams<Record<string, string | undefined>>();
    const [product, setproduct] = useState<ProductModel | null>(null);
    const [similarProductSuggestions, setSimilarProductSuggestions] = useState<ProductModel[]>([]);
    const wishlistItems = useSelector<RootState, RootState["wishlistState"]>((state: RootState) => state.wishlistState).wishlistItems;
    const dispatch = useDispatch();
    const fetchProductDetails= async () => {
        const response = await axios.get(`/products/${productId}`);
        if(response.data) {
            setproduct(response.data);
        }
        return response;
    }

    const fetchSimilarProductSuggestions = async () => {
        const response = await axios.get(`/products?category=${product?.category}`);
        if(response.data) {
            setSimilarProductSuggestions(response.data);
        }
        return response;
    }

    const onAddToWishlistHandler = (product: ProductModel) => {
        if(similarProductSuggestions){
            dispatch(addProductToWishlist(Object.assign({}, product, {quantity: 1})));
        }
        
    }
    useEffect(() => {
        fetchProductDetails();
        fetchSimilarProductSuggestions();
    }, [productId])

    function renderBody() {

        function displayPrice() {
            let _price = product?.price;
            const _discountPercent = product?.discountPercent;
            if(_price && _discountPercent && _discountPercent > 0) {
                _price = (_price * _discountPercent) / 100;
            }
            return (
                <span className="productPriceWrapper">
                    Rs.{_price}
                </span>
            );
        }
        
        function displayDiscountPrice() {
            if(!product?.discountPercent || product?.discountPercent == 0) {
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

        return (
            <div className="productDetailPage">
                <div className="productDetailComponent">
                    <div className="productImageSliderContainer">
                        <ImageSlider
                            id="productImageSlider"
                            name="productImageSlider"
                            images={(product?.images) ? product.images : []} 
                            style={{ height: "504px"}}
                        />
                    </div>
                    <div className="productDetailContainer">
                        <div className="productTitleWrapper">
                            <h2 className="productTitle">{product?.name}</h2>
                        </div>
                        <div className="productDiscriptionWrapper">
                            <h4 className="productDiscritpion">{product?.name}</h4>
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
                                onSelectedChange={(selected:string) => {
                                    console.log(selected);
                                    if(product) {
                                        product.size = +selected;
                                    }
                                }}
                            />
                        </div>
                        <div className="productColorSelectorWrapper">
                            <ColorSelector
                                label="select colour"
                                values={COLOR_SELECTOR_OPTIONS}
                                onSelectedChange={(selected) => {
                                    console.log(selected);
                                    if(product) {
                                        product.color = selected;
                                    }
                                }}
                            />
                        </div>
                        <div className="productDetailButtonActionsWrapper">
                            <div className="addToCartButton">
                                <ContainedButton
                                    label="Add to Cart"
                                    onClick={() => {
                                        console.log("Add to Cart");
                                    }}
                                />
                            </div>
                            <div className="buyNowButton">
                                <ContainedButton
                                    label="Buy Now"
                                    secondary={true}
                                    onClick={() => {
                                        console.log("Add to Cart");
                                    }}
                                />
                            </div>
                        </div>
                        <div className="productDetailDiscriptionWrapper">
                            <span className="productDetailTitle">
                                product details
                            </span>
                            <p className="productDetail">
                                White and sea green slim fit striped casual shirt, has a spread collar, button pocket,
                                1 pocket, long sleeves, curved hem
                            </p>
                            <span className="productDetailTitle">
                                size and fit
                            </span>
                            <p className="productDetail">
                                Slim Fit
                            </p>
                            <p className="productDetail">
                                The model is wearing size 40
                            </p>
                        </div>
                        <div className="productCustomerReviewWrapper">
                            <span className="productCustomerReviewTitle">
                                customer reviews
                            </span>
                            <div className="productCustomerReview">
                                <CustomerReview
                                    review={REVIEW}
                                />
                                <CustomerReview
                                    review={REVIEW}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="similarProductsContainer">
                    <span className="similarProductsTitle">
                        similar products
                    </span>
                    <div className="similarProductListWrapper">
                    {   similarProductSuggestions &&
                        similarProductSuggestions.map((product: any) => {

                            const isAddedInWishlist = wishlistItems.filter(item => item.id === product.id).length > 0;
                            return (<ProductCard key={product.id}
                                productTitle={product.name} 
                                price={product.price} 
                                discountPercent={product.discountPercent} 
                                imgs={product.images} 
                                isAddedInWishlist={isAddedInWishlist}
                                onAddToWishlist={() => onAddToWishlistHandler(product)}
                                buyNowHandler={(e) => {e.preventDefault(); console.log("Buy Now Clicked")}} 
                                addToCartHandler={(e) => {
                                    console.log("Add to Cart Clicked");
                                    // onAddtoCartButtonClickHandler(product.id);
                                }}
                                onClickHandler={(event: React.MouseEvent<Element, MouseEvent>) => {
                                    event.preventDefault();
                                    // onProductCardClickHandler(product.id);
                                }}
                            />)
                        })
                    }
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
