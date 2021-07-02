import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import PageTemplate from '../../components/templates/PageTemplate';
import { ProductModel } from '../../redux/cart/CartReducer';
import { RootState } from '../../store';
import axios from '../../api/axios';

import './Cart.scss'




const Cart = () :JSX.Element => {

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
                <span>
                {
                    cartState.cartItems.map((product: ProductModel) => {
                        return <li key={product.id}> {product.name} - {product.quantity} </li> 
                    })
                }    
            </span></div>
        </PageTemplate>);
}
export default Cart;