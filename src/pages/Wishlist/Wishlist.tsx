import React, { ReactNode } from 'react'
import PageTemplate from '../../components/templates/PageTemplate';
import { useHistory } from 'react-router-dom';

import './Wishlist.scss'
import JsonProductList from '../../assets/sampleData/Products.json';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';
import { connect } from 'react-redux'

import { addProductToCart } from '../../redux/cart/CartAction';

const Wishlist = () :JSX.Element => {

    const history = useHistory();
    const productList = [...JSON.parse(JSON.stringify(JsonProductList))];

    function onProductCardClickHandler(event: any) {
        event.preventDefault();
        history.push("/item");
    }
    function onAddtoCartButtonClickHandler(productId: number) {
        const product = productList.find((product: any) => product.id === productId);
        addProductToCart(product);
    }
    function renderProductListColumn() {
        return (
            <div className="productSearchListColumnContainer">
                <div className="productListContainer">
                    {   productList &&
                        productList.slice(0,5).map((product: any) => {

                            return (<ProductCard key={product.id}
                                productTitle={product.name} 
                                price={product.price} 
                                discountPercent={product.discountPercentage} 
                                imgs={product.images} 
                                buyNowHandler={(e) => {e.preventDefault(); console.log("Buy Now Clicked")}} 
                                addToCartHandler={(e) => {
                                    console.log("Add to Cart Clicked");
                                    onAddtoCartButtonClickHandler(product.id);
                                }}
                                onClickHandler={onProductCardClickHandler}
                            />)
                        })
                    }
                </div>
            </div>
        )
    }
    return (
        <PageTemplate>
            <div className="bodyComponent">
                <span className="wishlistTitle">My Wishlish ({productList.length} Items)</span>
            { renderProductListColumn()}</div>
         
        </PageTemplate>);
}

const mapStateToProps = (state: any) => ({
    cartState: state.cartState
})
  
export default connect(mapStateToProps, {addProductToCart})(Wishlist);