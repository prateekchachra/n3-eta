import { CART_ACTIONS } from '../actions/CartAction';
import { 
    ADD_PRODUCT_TO_CART
} from '../constants/CartActionConstants';

export type ProductModel = {
    id: number,
    name: string,
    price: number,
    discountPercentage: number,
    images: string[]
}

export type CartState ={
    cartItems: ProductModel[],
    isBuyItemActive: boolean
}

const initialState = {
    cartItems: [],
    isBuyItemActive: false
};

const cartState = (
    state: CartState = initialState,
    action: CART_ACTIONS 
) => {
    switch(action.type) {

        case ADD_PRODUCT_TO_CART: 
            console.log("From Cart.reducer" + action.payload);
            return { ...state, cartItems: [...state.cartItems, action.payload]}

        default:
            return state;
    }
}

export default cartState;