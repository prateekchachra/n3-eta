import React from 'react'
import { useSelector } from 'react-redux';
import PageTemplate from '../../components/templates/PageTemplate';
import { ProductModel } from '../../redux/cart/CartReducer';
import { RootState } from '../../store';

import './Cart.scss'




const Cart = () :JSX.Element => {

    const cartState = useSelector<RootState, RootState["cartState"]>((state: RootState) => state.cartState);
    console.log(cartState);

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