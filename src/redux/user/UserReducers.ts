import { LANGUAGES } from './../../utils/multilang/languages';
import { AnyAction } from 'redux';
import { ProductModel } from './../cart/CartReducer';
import { MARK_USER_AS_LOGGED_IN, MARK_USER_AS_LOGGED_OUT, SET_CURRENT_LOCALE } from './UserTypes';

export type UserModel = {
    email: string,
    name: string,
    profileImage: string,
    phone: number,
    wishList: ProductModel[],
    cartItems: ProductModel[],
    orders: ProductModel[],
    addresses: []
}

export type UserState = {
    user: UserModel,
    isUserLoggedIn: boolean,
    selectedLocale: string,
}

const initialState: UserState = {
    user: {
        email: '',
        name: '',
        profileImage: '',
        phone: -1,
        wishList: [],
        cartItems: [],
        orders: [],
        addresses: []
    },
    isUserLoggedIn: false,
    selectedLocale: LANGUAGES.ENGLISH
}

const userState = (
    state: UserState = initialState,
    action: AnyAction
) => {
    switch(action.type) {

        case MARK_USER_AS_LOGGED_IN: {

            if(action.userSnapShot) {
                console.info("User has logged in!");
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
                return { ...initialState }
            }
            return state;
        }

        default:
            return state;
    }
}

export default userState;