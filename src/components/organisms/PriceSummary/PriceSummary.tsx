import React from 'react';

import Button from '../../../components/molecules/button/Button';
import CartItem from '../CartItem/CartItem';
import { useSelector } from 'react-redux';

import { Table } from 'react-bootstrap';
import './PriceSummary.scss';
import { RootState } from '../../../store';
import { FormattedMessage, useIntl } from 'react-intl';


export type PriceSummaryProps = {
    buttonLabel: string,
    onButtonClick: () => void,
    toRenderCart?: boolean,
    onDeleteClick?: () => void,
    onAddRemoveItemClick?: () => void,

}


const PriceSummary = ({onButtonClick, toRenderCart, buttonLabel, onDeleteClick,onAddRemoveItemClick} : PriceSummaryProps) : JSX.Element => {

    const cartItems = useSelector<RootState, RootState["cartState"]>((state: RootState) => state.cartState).cartItems;
    const calculateDiscountedPrice = (price: number, discountPercent: number) => (price - ((price * discountPercent) / 100));
    const {formatMessage} = useIntl();
    let sumTotal = 0;
    let sumDiscount = 0;

    const cartItemsWithDiscount = cartItems.map((item, index) => {
        const {price, discountPercent} = item;
        const discountedPrice =  calculateDiscountedPrice(price, discountPercent);
        sumTotal += price;
        sumDiscount += (price - discountedPrice);
        return {...item, discountedPrice}
        }
    )


    const renderCartItems = (): JSX.Element => {
        if(cartItems){
            return (
                <Table bordered className="priceTable">
                    <thead>
                        <tr>
                            <th><FormattedMessage id="product" /></th>
                            <th><FormattedMessage id="price" /></th>
                            <th><FormattedMessage id="quantity" /></th>
                            <th><FormattedMessage id="total" /></th>
                        </tr>
                    </thead>
                    <tbody>
                {cartItemsWithDiscount.map((item,index) => {
                    return (
                        <CartItem 
                        key={item.id.toString()}
                        product={item}
                        onDeleteClick={onDeleteClick}
                        onAddRemoveItemClick={onAddRemoveItemClick}
                        />
                    )
                })}
                </tbody>
                </Table>
            )
        }
        else return (<></>);
    }

    return (
        <div className="cartContainer">
        <span className="cartLabel"><FormattedMessage id="price_summary" /></span>
        {toRenderCart ? renderCartItems() : null}
        <div className="itemContainer">
           { <span className="cartItemLabel"><FormattedMessage id="price" /> {cartItems ? `(${cartItems.length + ' ' + formatMessage({id: 'items'})})` : ''}</span>}
            <span className="cartValue">₹{sumTotal}</span>
        </div>
        <div className="itemContainer">
            <span className="cartItemLabel"><FormattedMessage id="discount" /></span> 
            <span className="cartDiscountValue">-₹{sumDiscount}</span> 
        </div>
        <div className="itemContainer">
            <span className="cartItemLabel"><FormattedMessage id="delivery_charges" /></span>
            <span className="cartDiscountValue"><FormattedMessage id="free" /></span>
        </div>
        <div className="itemContainer totalContainer">
            <span className="cartItemLabel cartTotalLabel"><FormattedMessage id="total" /></span>
            <span className="cartTotalValue">₹{sumTotal - sumDiscount}</span>
        </div>

        <Button type="contained" secondary label={buttonLabel} onClick={onButtonClick} />
    </div>
    )
}
export default PriceSummary;