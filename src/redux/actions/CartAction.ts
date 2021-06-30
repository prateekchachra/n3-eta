import { ADD_PRODUCT_TO_CART } from '../constants/CartActionConstants';
import { ProductModel } from './../reducers/CartReducer';

export type CART_ACTIONS =
    { type: string, payload: ProductModel}

export const addProductToCart = (product: ProductModel): CART_ACTIONS => ({
    type: ADD_PRODUCT_TO_CART,
    payload: product,
})