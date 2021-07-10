import React, { ReactNode } from 'react'
import PageTemplate from '../../components/templates/PageTemplate';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './Wishlist.scss'
import { useSelector } from 'react-redux';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';
import { connect } from 'react-redux'

import { RootState } from '../../store';
import { ProductModel } from '../../redux/cart/CartReducer';
import { addProductinToCart } from '../../redux/user/UserActions';

const Wishlist = () :JSX.Element => {

    const history = useHistory();
    const wishlistItems = useSelector<RootState, RootState["wishlistState"]>((state: RootState) => state.wishlistState).wishlistItems;

    function onProductCardClickHandler(productId: number) {
        history.push(`/item/${productId}`);
    }
    function onAddtoCartButtonClickHandler(product: ProductModel) {
        addProductinToCart(product);
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
                    : <span><FormattedMessage id="no_items_wishlist"/></span>}
                </div>
            </div>
        )
    }
    return (
        <PageTemplate>
            <div className="bodyComponent">
                <span className="wishlistTitle"><FormattedMessage id="my_wishlist" /> ({wishlistItems.length} <FormattedMessage id="items" />)</span>
            { renderProductListColumn()}</div>
         
        </PageTemplate>);
}

const mapStateToProps = (state: any) => ({
    cartState: state.cartState
})
  
export default connect(mapStateToProps, {addProductinToCart})(Wishlist);