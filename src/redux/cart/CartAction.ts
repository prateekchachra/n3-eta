import { ADD_PRODUCT_TO_CART, RESET_CART } from './CartTypes';
import { ProductModel } from './CartReducer';

type ADD_PRODUCT_TO_CART_ACTION_TYPE = { type: string, payload: ProductModel}

type RESET_CART_ACTION_TYPE = { type: string, userId: string }

export type CART_ACTIONS =
    | ADD_PRODUCT_TO_CART_ACTION_TYPE
    | RESET_CART_ACTION_TYPE

export const addProductToCart = (product: ProductModel): ADD_PRODUCT_TO_CART_ACTION_TYPE => ({
    type: ADD_PRODUCT_TO_CART,
    payload: product
})

export const resetCart = (userId: string): RESET_CART_ACTION_TYPE => ({
    type: RESET_CART,
    userId: userId
})