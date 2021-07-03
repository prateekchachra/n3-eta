import { ProductModel } from './../cart/CartReducer';
import { ADD_PRODUCT_TO_WISHLIST} from './WishlistTypes';

export type WISHLIST_ACTIONS =
    { type: string, payload: ProductModel}

export const addProductToWishlist = (product: ProductModel): WISHLIST_ACTIONS => ({
    type: ADD_PRODUCT_TO_WISHLIST,
    payload: product,
})
