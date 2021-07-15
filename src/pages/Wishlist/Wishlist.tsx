import React, { useState } from 'react'
import PageTemplate from '../../components/templates/PageTemplate';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import './Wishlist.scss'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';
import { connect } from 'react-redux'

import { RootState } from '../../store';
import { ProductModel } from '../../redux/cart/CartReducer';
import { addProductinToCart } from '../../redux/user/UserActions';
import AddToCartModal from '../../components/organisms/modals/AddToCartModal/AddToCardModal';
import { showLoginModal } from '../../redux/loginModal/LoginModalActions';
import { toast } from 'react-toastify';
import { removeItemFromWishlist } from '../../redux/wishlist/WishlistActions';

const Wishlist = () :JSX.Element => {

    const history = useHistory();
    const dispatch = useDispatch();
    const {formatMessage} = useIntl();
    
    const wishlistItems = useSelector<RootState, RootState["wishlistState"]>((state: RootState) => state.wishlistState).wishlistItems;
    const userState = useSelector<RootState , RootState["userState"]>((state: RootState) => state.userState);

    const [showAddToCart, setShowAddToCart] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);

    const onProductCardClickHandler = (productId: number) => {
        history.push(`/item/${productId}`);
    }
    const onAddtoCartButtonClickHandler = (product: ProductModel) => {
       setShowAddToCart(true)
       setSelectedProduct(product);
    }
    const onBuyNowClickHandler = (size: string, color: string, quantity: number) => {
        if(!userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return;
        }
        else if(selectedProduct) {
            dispatch(addProductinToCart(Object.assign({}, selectedProduct, 
                {quantity, size, color})));
            history.push("/cart");
        }
    }
    const onAddtoCartClickHandler = (size: string, color: string, quantity: number) => {
        dispatch(addProductinToCart(Object.assign({}, selectedProduct, 
            {quantity, size, color})));
        
        toast(formatMessage({id: 'added_to_cart'}), {
            type: 'success'
        })
        setShowAddToCart(false);
    }

    const onAddToCartHide = () => {
        setShowAddToCart(false);
        setSelectedProduct(null);
    }
    
    const onRemoveItemClick = (productId: string) => {
        toast(formatMessage({id: 'remove_wishlist'}), {
            type: 'success'
        });
        dispatch(removeItemFromWishlist(productId))
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
                                onRemoveFromWishlistClick={() => onRemoveItemClick(product.id)}
                                addToCartHandler={(e) => onAddtoCartButtonClickHandler(product)}
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
            { renderProductListColumn()}
            <AddToCartModal 
                show={showAddToCart}
                onHide={onAddToCartHide}
                onBuyNowClick={onBuyNowClickHandler}
                onAddClick={onAddtoCartClickHandler}
                />            
            </div>
         
        </PageTemplate>);
}

const mapStateToProps = (state: any) => ({
    cartState: state.cartState
})
  
export default connect(mapStateToProps, {addProductinToCart})(Wishlist);