import { ADD_PRODUCT_TO_WISHLIST, RESET_WISHLIST } from './WishlistTypes';
import { getProductIndex } from '../cart/utils'
import { ProductModel } from '../cart/CartReducer';
import { WISHLIST_ACTIONS } from './WishlistActions';
import { toast } from 'react-toastify';

export type WishlistState = {
    wishlistItems: ProductModel[],
}

export const wishlistInitialState = {
    wishlistItems: []
};

const wishlistState = (
    state: WishlistState = wishlistInitialState,
    action: WISHLIST_ACTIONS 
) => {
    switch(action.type) {

        case ADD_PRODUCT_TO_WISHLIST: {
            const product: ProductModel = action.payload;
            const index = getProductIndex(state.wishlistItems, product.id);

            if(index == -1) {
                toast('Added to Wishlist Successfully!', {
                    type: 'success'
                });
                return { ...state, wishlistItems: [...state.wishlistItems, action.payload]}
            }
            toast('Removed from Wishlist Successfully!', {
                type: 'success'
            });
            const updatedWishlistItems = [...state.wishlistItems];
            updatedWishlistItems.splice(index, 1)
            return { ...state, wishlistItems: updatedWishlistItems}
        }

        case RESET_WISHLIST: {
            return wishlistInitialState;
        }
        
        default:
            return state;
    }
}

export default wishlistState;