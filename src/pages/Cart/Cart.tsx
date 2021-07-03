import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import PageTemplate from '../../components/templates/PageTemplate';
import { ProductModel } from '../../redux/cart/CartReducer';
import { RootState } from '../../store';
import axios from '../../api/axios';

import './Cart.scss'
import { useHistory } from 'react-router-dom';
import PriceSummary from '../../components/organisms/PriceSummary/PriceSummary';

const CART_ITEMS: ProductModel[] = [];

const Cart = () :JSX.Element => {
    const [cartItems, setCartItems] = useState(CART_ITEMS);
    const history = useHistory();

    const onDeleteClick = () => {
        console.log('deleted')
    }
    const onAddItemClick = () => {
        console.log('added')
    }
    const cartState = useSelector<RootState, RootState["cartState"]>((state: RootState) => state.cartState);
    console.log(cartState);

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
                <PriceSummary
                cartItems={cartItems}
                onDeleteClick={onDeleteClick}
                onAddRemoveItemClick={onAddItemClick}
                buttonLabel="PLACE ORDER" onButtonClick={() => history.push('checkout')} />
            </div>
        </PageTemplate>);
}
export default Cart;