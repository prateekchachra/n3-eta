import React, { useEffect, useState } from 'react'
import PageTemplate from '../../components/templates/PageTemplate';

import './Cart.scss'
import { useHistory } from 'react-router-dom';
import PriceSummary from '../../components/organisms/PriceSummary/PriceSummary';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FormattedMessage, useIntl } from 'react-intl';
import { removeProductFromCart } from '../../redux/user/UserActions';
import { ProductModel } from '../../redux/cart/CartReducer';


const Cart = () :JSX.Element => {

    const history = useHistory();
    const dispatch = useDispatch();
    const {formatMessage} = useIntl();
    const onDeleteClick = (productId: number) => {
        dispatch(removeProductFromCart(productId))
    }
    
    const userState = useSelector<RootState , RootState["userState"]>((state: RootState) => state.userState);
    const [cartItems, setCartItems] = useState<ProductModel[]>([]);

    useEffect( () => {
        if(userState.user.cart) {
            setCartItems(userState.user.cart.cartItems);
        }  
      }, [userState]);

    return (
        <PageTemplate>
            <div className="bodyComponent">
                <span className="cartTitle"><FormattedMessage id="my_cart"/></span>
              {cartItems && cartItems.length > 0 ?   
              <PriceSummary
                toRenderCart
                onDeleteClick={onDeleteClick}
                buttonLabel={formatMessage({id: 'place_order'})} onButtonClick={() => history.push('checkout')} />:
                (<span><FormattedMessage id="no_items_cart"/></span>)}
            </div>
        </PageTemplate>);
}
export default Cart;