import { ADD_PRODUCT_TO_WISHLIST } from './../wishlist/WishlistTypes';
import { addProductToCart } from './../cart/CartAction';
import { ADD_PRODUCT_TO_CART } from './../cart/CartTypes';
import { AnyAction } from 'redux';
import cartState, { cartInitialState, CartState, ProductModel } from './../cart/CartReducer';
import { USER_ACTIONS } from './UserActions';
import wishlistState, { wishlistInitialState, WishlistState } from '../wishlist/WishlistReducer';
import { addProductToWishlist } from '../wishlist/WishlistActions';
import { LANGUAGES } from './../../utils/multilang/languages';
import { MARK_USER_AS_LOGGED_IN, MARK_USER_AS_LOGGED_OUT, SET_CURRENT_LOCALE } from './UserTypes';

export type UserModel = {
    id?: number,
    email: string,
    name: string,
    profileImage: string,
    phone: number,
    wishList: WishlistState,
    cart: CartState,
    orders: ProductModel[],
    addresses: []
}

export type UserState = {
    user: UserModel,
    isUserLoggedIn: boolean,
    selectedLocale: string,
}

export const initialUserState: UserState = {
    user: {
        email: '',
        name: '',
        profileImage: '',
        phone: -1,
        wishList: wishlistInitialState,
        cart: cartInitialState,
        orders: [],
        addresses: []
    },
    isUserLoggedIn: false,
    selectedLocale: LANGUAGES.ENGLISH
}

const userState = (
    state: UserState = initialUserState,
    action: AnyAction
) => {
    switch(action.type) {

        case MARK_USER_AS_LOGGED_IN: {

            if(action.userSnapShot) {
                console.info("User has logged in!");
                console.log("User Snap Shot", action.userSnapShot);
                return {
                    user: Object.assign({}, action.userSnapShot),
                    isUserLoggedIn: true,
                    selectedLocale: state.selectedLocale
                    
                }
            }
            return state;
        }
        case SET_CURRENT_LOCALE: {
            if(action.locale) {
                return {
                   user: state.user,
                   isUserLoggedIn: state.isUserLoggedIn,
                   selectedLocale: action.locale,
                }
            }
            return state;
        }

        case MARK_USER_AS_LOGGED_OUT: {

            if(state) {
                console.info("User has logged out!");
                return { state: initialUserState }
            }
            return state;
        }

        case ADD_PRODUCT_TO_CART: {

            if(action.payload) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        cart: cartState(state.user.cart, addProductToCart(action.payload))
                    }
                }
            }

            return state;
        }

        case ADD_PRODUCT_TO_WISHLIST: {

            if(action.payload) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        wishList: wishlistState(state.user.wishList, addProductToWishlist(action.payload))
                    }
                }
            }

            return state;
        }

        default:
            return state;
    }
}

export default userState;