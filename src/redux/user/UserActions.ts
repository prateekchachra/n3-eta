import { OrderType } from './../../components/organisms/Order/Order';
import { CardType } from './../../components/organisms/Card/Card';
import { AddressType } from './../../components/organisms/Address/Address';
import { ADD_PRODUCT_TO_CART } from './../cart/CartTypes';
import { ProductModel } from './../cart/CartReducer';
import { RootState } from './../../store';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { UserModel } from './UserReducers';
import { 
    MARK_USER_AS_LOGGED_IN,
    MARK_USER_AS_LOGGED_OUT,
    SAVE_ADDRESS_TO_USER,
    SAVE_CARD_TO_USER,
    SAVE_ORDER_TO_USER,
    SET_ADDRESS_AS_DEFAULT,
    DELETE_ADDRESS,
    DELETE_CARD,
    SET_CARD_AS_DEFAULT,
    SET_CURRENT_LOCALE
} from './UserTypes';
import axios from "../../api/axios";
import { ADD_PRODUCT_TO_WISHLIST } from '../wishlist/WishlistTypes';
import { showLoginModal } from '../loginModal/LoginModalActions';

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
export const saveAddressToUser = (address: AddressType)
    : ThunkAction<void, RootState, unknown, AnyAction> => 
    async (dispatch, getRootState) => {
        if(getRootState().userState.isUserLoggedIn) {
           
            dispatch({
                type: SAVE_ADDRESS_TO_USER,
                payload: address
            });
        }
    }
export const saveCardToUser = (card: CardType)
    : ThunkAction<void, RootState, unknown, AnyAction> => 
    async (dispatch, getRootState) => {
        if(getRootState().userState.isUserLoggedIn) {
           
            dispatch({
                type: SAVE_CARD_TO_USER,
                payload: card
            });
        }
    }
export const saveOrderToUser = (order: OrderType)
    : ThunkAction<void, RootState, unknown, AnyAction> => 
    async (dispatch, getRootState) => {
        if(getRootState().userState.isUserLoggedIn) {
           
            dispatch({
                type: SAVE_ORDER_TO_USER,
                payload: order
            });
        }
    }
export const setAddressAsDefault = (address: AddressType)
    : ThunkAction<void, RootState, unknown, AnyAction> => 
    async (dispatch, getRootState) => {
        if(getRootState().userState.isUserLoggedIn) {
           
            dispatch({
                type: SET_ADDRESS_AS_DEFAULT,
                payload: address
            });
        }
    }
export const setCardAsDefault = (card: CardType)
    : ThunkAction<void, RootState, unknown, AnyAction> => 
    async (dispatch, getRootState) => {
        if(getRootState().userState.isUserLoggedIn) {
           
            dispatch({
                type: SET_CARD_AS_DEFAULT,
                payload: card
            });
        }
    }
export const deleteAddress = (address: AddressType)
    : ThunkAction<void, RootState, unknown, AnyAction> => 
    async (dispatch, getRootState) => {
        if(getRootState().userState.isUserLoggedIn) {
           
            dispatch({
                type: DELETE_ADDRESS,
                payload: address
            });
        }
    }
export const deleteCard = (card: CardType)
    : ThunkAction<void, RootState, unknown, AnyAction> => 
    async (dispatch, getRootState) => {
        if(getRootState().userState.isUserLoggedIn) {
           
            dispatch({
                type: DELETE_CARD,
                payload: card
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
