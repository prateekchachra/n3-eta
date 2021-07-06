import React, { useEffect, useState } from 'react'
import PageTemplate from '../../components/templates/PageTemplate';

import './Cart.scss'
import { useHistory } from 'react-router-dom';
import PriceSummary from '../../components/organisms/PriceSummary/PriceSummary';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';


const Cart = () :JSX.Element => {

    const history = useHistory();

    const onDeleteClick = () => {
        console.log('deleted')
    }
    const onAddItemClick = () => {
        console.log('added')
    }
  
    const cartItems = useSelector<RootState, RootState["cartState"]>((state: RootState) => state.cartState).cartItems;

    useEffect( () => {
        /** FETCH ORDER HISTORY **/
        /* const fetchOrderHistory = async () => {
            const response = await axios.get("/orders?emailid=bobBuilder@gmail.com");
            console.log("Orders", response);
        } */

        /** ADD ORDER SNIPPET **/
        /* const addOrderItems = async () => {
            const order: any = {
                emailid: "bobBuilder@gmail.com",
                orderAmount: 600,
                products: cartState.cartItems.map(cartItem => cartItem.id)
            }
            await axios.post("/orders", order);
        } */
        /* addOrderItems();
        fetchOrderHistory(); */
    }, [])

    return (
        <PageTemplate>
            <div className="bodyComponent">
                <span className="cartTitle">My Cart</span>
              {cartItems && cartItems.length > 0 ?   
              <PriceSummary
                toRenderCart
                onDeleteClick={onDeleteClick}
                onAddRemoveItemClick={onAddItemClick}
                buttonLabel="PLACE ORDER" onButtonClick={() => history.push('checkout')} />:
                (<span>No Items in Cart. Explore and add some from our catalogue!</span>)}
            </div>
        </PageTemplate>);
}
export default Cart;