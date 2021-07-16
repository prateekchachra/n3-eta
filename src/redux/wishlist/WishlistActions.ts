import { ProductModel } from './../cart/CartReducer';
import { ADD_PRODUCT_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
    RESET_WISHLIST
} from './WishlistTypes';

type RESET_WISHLIST_ACTION_TYPE = { type: string, userId: string }
type REMOVE_WISHLIST_ACTION_TYPE = { type: string, productId: string }
type ADD_WISHLIST_ACTION_TYPE = { type: string, payload: ProductModel } 


export type WISHLIST_ACTIONS = ADD_WISHLIST_ACTION_TYPE
   | RESET_WISHLIST_ACTION_TYPE
    | REMOVE_WISHLIST_ACTION_TYPE

export const addProductToWishlist = (product: ProductModel): WISHLIST_ACTIONS => ({
    type: ADD_PRODUCT_TO_WISHLIST,
    payload: product,
})
export const removeItemFromWishlist = (productId: string): WISHLIST_ACTIONS => ({
    type: REMOVE_FROM_WISHLIST,
    productId,
})

export const resetWishList = (userId: string): WISHLIST_ACTIONS => ({
    type: RESET_WISHLIST,
    userId: userId
})
