import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import PageTemplate from '../../components/templates/PageTemplate';
import { ProductModel } from '../../redux/cart/CartReducer';
import { RootState } from '../../store';

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