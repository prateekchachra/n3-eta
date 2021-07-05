import { ProductModel } from './../cart/CartReducer';
import { ADD_PRODUCT_TO_WISHLIST,
    RESET_WISHLIST
} from './WishlistTypes';

type RESET_WISHLIST_ACTION_TYPE = { type: string, userId: string }

export type WISHLIST_ACTIONS =
    { type: string, payload: ProductModel}

export const addProductToWishlist = (product: ProductModel): WISHLIST_ACTIONS => ({
    type: ADD_PRODUCT_TO_WISHLIST,
    payload: product,
})

export const resetWishList = (userId: string): RESET_WISHLIST_ACTION_TYPE => ({
    type: RESET_WISHLIST,
    userId: userId
})
