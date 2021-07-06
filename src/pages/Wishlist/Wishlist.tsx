import React, { ReactNode } from 'react'
import PageTemplate from '../../components/templates/PageTemplate';
import { useHistory } from 'react-router-dom';

import './Wishlist.scss'
import { useSelector } from 'react-redux';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';
import { connect } from 'react-redux'

import { addProductToCart } from '../../redux/cart/CartAction';
import { RootState } from '../../store';
import { ProductModel } from '../../redux/cart/CartReducer';

const Wishlist = () :JSX.Element => {

    const history = useHistory();
    const wishlistItems = useSelector<RootState, RootState["wishlistState"]>((state: RootState) => state.wishlistState).wishlistItems;

    function onProductCardClickHandler(productId: number) {
        history.push(`/item/${productId}`);
    }
    function onAddtoCartButtonClickHandler(product: ProductModel) {
        addProductToCart(product);
    }
    function renderProductListColumn() {
        return (
            <div className="productSearchListColumnContainer">
                <div className="productListContainer">
                    {  wishlistItems && wishlistItems.length > 0 ? wishlistItems.map((product: any) => {

                            return (<ProductCard key={product.id}
                                withoutWishlistActions
                                productTitle={product.name} 
                                price={product.price} 
                                discountPercent={product.discountPercentage} 
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
                    : <span>No Items in Wishlist. Please Add Some!</span>}
                </div>
            </div>
        )
    }
    return (
        <PageTemplate>
            <div className="bodyComponent">
                <span className="wishlistTitle">My Wishlish ({wishlistItems.length} Items)</span>
            { renderProductListColumn()}</div>
         
        </PageTemplate>);
}

const mapStateToProps = (state: any) => ({
    cartState: state.cartState
})
  
export default connect(mapStateToProps, {addProductToCart})(Wishlist);