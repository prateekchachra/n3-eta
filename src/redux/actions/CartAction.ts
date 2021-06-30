import { ADD_PRODUCT_TO_CART } from '../constants/CartActionConstants';

export const addProductToCart = (product: any) => ({
    type: ADD_PRODUCT_TO_CART,
    payload: product,
})