import { ADD_PRODUCT_TO_WISHLIST } from './WishlistTypes';
import { getProductIndex } from '../cart/utils'
import { ProductModel } from '../cart/CartReducer';
import { WISHLIST_ACTIONS } from './WishlistActions';


const initialState = {
    wishlistItems: []
};
export type WishlistState ={
    wishlistItems: ProductModel[],
}

const wishlistState = (
    state: WishlistState = initialState,
    action: WISHLIST_ACTIONS 
) => {
    switch(action.type) {

        case ADD_PRODUCT_TO_WISHLIST: {
            const product: ProductModel = action.payload;
            const index = getProductIndex(state.wishlistItems, product.id);

            if(index == -1) {
                return { ...state, wishlistItems: [...state.wishlistItems, action.payload]}
            }

            const currentProduct = state.wishlistItems[index];
            const updateProduct = Object.assign({}, currentProduct, {quantity: currentProduct.quantity + product.quantity});
            return { ...state, wishlistItems: [
                ...state.wishlistItems.slice( 0, index ),
                updateProduct,
                ...state.wishlistItems.slice( index + 1 ),
            ]}
        }
        default:
            return state;
    }
}

export default wishlistState;