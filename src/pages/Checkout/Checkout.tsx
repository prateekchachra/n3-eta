import React, { ReactNode } from 'react'
import PageTemplate from '../../components/templates/PageTemplate';

import './Checkout.scss'

import { useHistory } from 'react-router-dom';
import PriceSummary from '../../components/organisms/PriceSummary/PriceSummary';



const Checkout = () :JSX.Element => {

    const history = useHistory();

    return (
        <PageTemplate>
            <div className="bodyComponent">
                <span className="checkoutTitle">Billing Info</span>
                <span className="checkoutDescription">Please Enter The Details</span>
                <div className="checkoutRow">
                    <PriceSummary buttonLabel="Buy Now" onButtonClick={() => history.push('payment')} />
                </div>
            </div>
        </PageTemplate>);
}
export default Checkout;