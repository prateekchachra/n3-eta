import React, { ReactNode } from 'react'
import PageTemplate from '../../components/templates/PageTemplate';

import './Cart.scss'
import { useHistory } from 'react-router-dom';
import PriceSummary from '../../components/organisms/PriceSummary/PriceSummary';


const Cart = () :JSX.Element => {

    const history = useHistory();

    return (
        <PageTemplate>
            <div className="bodyComponent">
                <span className="cartTitle">My Cart</span>
                <PriceSummary  buttonLabel="PLACE ORDER" onButtonClick={() => history.push('checkout')} />
            </div>
        </PageTemplate>);
}
export default Cart;