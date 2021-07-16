import React, { useEffect, useState } from 'react'
import PageTemplate from '../../components/templates/PageTemplate';

import './Cart.scss'
import { useHistory } from 'react-router-dom';
import PriceSummary from '../../components/organisms/PriceSummary/PriceSummary';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FormattedMessage, useIntl } from 'react-intl';
import { removeItemFromCart } from '../../redux/cart/CartAction';


const Cart = () :JSX.Element => {

    const history = useHistory();
    const dispatch = useDispatch();
    const {formatMessage} = useIntl();
    const onDeleteClick = (productId: number) => {
        dispatch(removeItemFromCart(productId))
    }
  
    const cartItems = useSelector<RootState, RootState["cartState"]>((state: RootState) => state.cartState).cartItems;

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