import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import PageTemplate from '../../components/templates/PageTemplate';
import { ProductModel } from '../../redux/cart/CartReducer';
import { RootState } from '../../store';

import './Cart.scss'
import { useHistory } from 'react-router-dom';
import PriceSummary from '../../components/organisms/PriceSummary/PriceSummary';

const CART_ITEMS: ProductModel[] = [ {
            "id": 2,
            "name": "Men's Polo Jacket",
            "price": 650,
            "quantity": 2,
            "discountPercentage": 50,
            "category": "jacket",
            "images": [
                "https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            ]
        },

        {
            "id": 3,
            "name": "Men's Polo Track",
            "price": 850,
            "quantity": 2,
            "discountPercentage": 0,
            "category": "track",
            "images": [
                "https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            ]
        },
        ];

const Cart = () :JSX.Element => {
    const [cartItems, setCartItems] = useState(CART_ITEMS);
    const history = useHistory();

    const onDeleteClick = () => {
        console.log('deleted')
    }
    const onAddItemClick = () => {
        console.log('added')
    }
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