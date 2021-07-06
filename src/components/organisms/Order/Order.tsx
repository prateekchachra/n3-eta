import React, { MouseEventHandler } from 'react';

import './Order.scss';
import { Link } from 'react-router-dom';

export type OrderItem = {
    productName: string,
    productId: number,
    size: number,
    color: string, 
    quantity: number,
}

export type OrderType = {
    items: OrderItem[],
    total: string,

}
export type OrderProps = {
    order: OrderType,
    orderNumber: number,
}



const Order = ({order, orderNumber} : OrderProps) :JSX.Element => {
    
    const { items, total} = order;


    function renderItem(item: OrderItem){
        const {productName, productId, size, color, quantity} = item;
        return (<Link to={`/item/${productId}`}><span className="orderItem">{productName} (Size: {size}, Color: {color}) X {quantity}</span></Link>)
    }   
    function renderItems() {
        return (
            <div className="orderFieldWrapper">
                {items.map((item => renderItem(item)))}
            </div>
        )
    }
    
    function renderTotal() {
        return (
            <div className="orderFieldWrapper">
                <div className="orderTotal">
                    Rs. { total }
                </div>
            </div>
        )
    }
    
    return (
        <tr className="orderWrapper">
           <td>{ orderNumber }</td>
           <td>{ renderItems() }</td>
           <td>{ renderTotal() }</td>
        </tr>
    );
}

export default Order;