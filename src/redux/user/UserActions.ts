import { ADD_PRODUCT_TO_CART } from './../cart/CartTypes';
import { ProductModel } from './../cart/CartReducer';
import { RootState } from './../../store';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { UserModel } from './UserReducers';
import { 
    MARK_USER_AS_LOGGED_IN, MARK_USER_AS_LOGGED_OUT, 
    SET_CURRENT_LOCALE
} from './UserTypes';
import axios from "../../api/axios";
import { CART_ACTIONS } from '../cart/CartAction';
import { WISHLIST_ACTIONS } from '../wishlist/WishlistActions';
import { ADD_PRODUCT_TO_WISHLIST } from '../wishlist/WishlistTypes';
import { showLoginModal } from '../loginModal/LoginModalActions';
import { toast } from 'react-toastify';

 type USER_LOGIN =  { type: string, userSnapShot: UserModel}
 type USER_LOGOUT = { type: string } 
 type SET_CURRENT_LOCALE =
 { type: string, locale: string};


export type USER_ACTIONS = USER_LOGIN
    | USER_LOGOUT | SET_CURRENT_LOCALE;

export const markUserAsLoggedIn = (user: UserModel): USER_ACTIONS => ({
    type: MARK_USER_AS_LOGGED_IN,
    userSnapShot: user
})

export const markUserAsLoggedOut = (user: UserModel)
    : ThunkAction<void, RootState, unknown, AnyAction> => 
    async (dispatch, getRootState) => {
        if(getRootState().userState.isUserLoggedIn) {
            const updatedUser = await axios.put(`users/${user.id}`, user);
            console.log("UpdateUser:", updatedUser);
            dispatch({
                type: MARK_USER_AS_LOGGED_OUT
            });
        }
    }

export const addProductinToCart = (product: ProductModel)
    : ThunkAction<void, RootState, unknown, AnyAction> => 
    async (dispatch, getRootState) => {
        if(!getRootState().userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return;
        }

        if(getRootState().userState.isUserLoggedIn && product) {
            dispatch(
                {
                    type: ADD_PRODUCT_TO_CART,
                    payload: product
                }
            )
        }
    }

export const addProductinToWishlist = (product: ProductModel)
    : ThunkAction<void, RootState, unknown, AnyAction> => 
    async (dispatch, getRootState) => {
        if(!getRootState().userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return;
        }

        if(getRootState().userState.isUserLoggedIn && product) {
            dispatch(
                {
                    type: ADD_PRODUCT_TO_WISHLIST,
                    payload: Object.assign({}, product, {quantity: 1})
                }
            )
        }
    }

export const buyProduct = (product: ProductModel)
    : ThunkAction<boolean, RootState, unknown, AnyAction> => 
    (dispatch, getRootState) => {
        if(!getRootState().userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return false;
        }

        if(getRootState().userState.isUserLoggedIn && product) {
            dispatch(
                {
                    type: ADD_PRODUCT_TO_WISHLIST,
                    payload: Object.assign({}, product, {quantity: 1})
                }
            );
            return true;
        }

        return false;
    }
    
export const setCurrentLocale = (locale: string): USER_ACTIONS => ({
    type: SET_CURRENT_LOCALE,
    locale,
})
