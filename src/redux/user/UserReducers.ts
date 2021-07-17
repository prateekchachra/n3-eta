import { AddressType } from './../../components/organisms/Address/Address';
import { CardType } from './../../components/organisms/Card/Card';
import { ADD_PRODUCT_TO_WISHLIST, REMOVE_FROM_WISHLIST } from './../wishlist/WishlistTypes';
import { addProductToCart, removeItemFromCart } from './../cart/CartAction';
import { ADD_PRODUCT_TO_CART, REMOVE_FROM_CART, RESET_CART } from './../cart/CartTypes';
import { AnyAction } from 'redux';
import cartState, { cartInitialState, CartState } from './../cart/CartReducer';
import wishlistState, { wishlistInitialState, WishlistState } from '../wishlist/WishlistReducer';
import { addProductToWishlist, removeItemFromWishlist } from '../wishlist/WishlistActions';
import { LANGUAGES } from './../../utils/multilang/languages';
import { 
    MARK_USER_AS_LOGGED_IN,
    MARK_USER_AS_LOGGED_OUT,
    SAVE_ADDRESS_TO_USER,
    SAVE_CARD_TO_USER,
    SAVE_ORDER_TO_USER,
    SET_ADDRESS_AS_DEFAULT,
    SET_CARD_AS_DEFAULT,
    DELETE_ADDRESS,
    DELETE_CARD,
    SET_CURRENT_LOCALE
} from './UserTypes';
import { OrderType } from '../../components/organisms/Order/Order';

export type UserModel = {
    id?: number,
    email: string,
    name: string,
    profileImage: string,
    phone: number,
    wishList: WishlistState,
    cart: CartState,
    orders: OrderType[],
    addresses: AddressType[],
    cards: CardType[]
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
        addresses: [],
        cards: []
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
                return {
                    user: Object.assign({}, action.userSnapShot),
                    isUserLoggedIn: true,
                    selectedLocale: state.selectedLocale
                    
                }
            }
            return state;
        }
        case MARK_USER_AS_LOGGED_OUT: {

            if(state) {
                console.info("User has logged out!");
                return initialUserState;
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
        case SAVE_ADDRESS_TO_USER: {
            if(action.payload) {
                const userAddresses = state.user.addresses ? [...state.user.addresses] : [];
                userAddresses.push(action.payload)
                
                if(userAddresses.length === 1) {
                    userAddresses[0].default = true;
                }
                return {
                    ...state,
                   user: {
                    ...state.user,
                    addresses: userAddresses
                },
                  }
            }
            return state;
        }
        case SAVE_CARD_TO_USER: {
            if(action.payload) {
                const userCards = state.user.cards ? [...state.user.cards] : [];
                userCards.push(action.payload)

                if(userCards.length === 1) {
                    userCards[0].default = true;
                }
                return {
                    ...state,
                   user: {
                    ...state.user,
                    cards: userCards,
                }
                  }
            }
            return state;
        }
        case SAVE_ORDER_TO_USER: {
            if(action.payload) {
                const userOrders = state.user.orders ? [...state.user.orders] : [];
                userOrders.push(action.payload)

                return {
                    ...state,
                   user: {
                    ...state.user,
                    orders: userOrders
                    }
                  }
            }
            return state;
        }
        case SET_ADDRESS_AS_DEFAULT: {
            if(action.payload) {
                const userAddresses = state.user.addresses ? [...state.user.addresses] : [];

                let currentAddIndex = -1;
                let defaultAddIndex = -1;
                let currentAdd: AddressType = userAddresses[0];
                let defaultAdd: AddressType = userAddresses[0];

                userAddresses.map((item, index) => {
                    if(item.name === action.payload.name){
                        currentAddIndex = index;
                        currentAdd = item;
                    }
                
                    if(item.default === true){
                        defaultAddIndex = index;
                        defaultAdd = item;
                    }
                
                });
                if(currentAddIndex !== -1){
                    if(defaultAddIndex !== -1){
                        defaultAdd.default = false;
                        userAddresses[defaultAddIndex] = defaultAdd;
                    }
                    currentAdd.default = true;
                    userAddresses[currentAddIndex] = currentAdd;
                }
                return {
                    ...state,
                    user: {
                    ...state.user,
                    addresses: userAddresses,
                    }
                  }
            }
            return state;
        }
        case SET_CARD_AS_DEFAULT: {
            if(action.payload) {
                const userCards = state.user.cards ? [...state.user.cards] : [];

                let currentCardIndex = -1;
                let defaultCardIndex = -1;
                
                let currentCard: CardType = userCards[0];
                let defaultCard: CardType = userCards[0];

                userCards.map((item, index) => {
                    if(item.cardNumber === action.payload.cardNumber){
                        currentCardIndex = index;
                        currentCard = item;
                    }
                
                    if(item.default === true){
                        defaultCardIndex = index;
                        defaultCard = item;
                    }
                
                });
                if(currentCardIndex !== -1 && defaultCardIndex !== -1){
                    defaultCard.default = false;
                    currentCard.default = true;
                    
                    userCards[currentCardIndex] = currentCard;
                    userCards[defaultCardIndex] = defaultCard;

                }
                return {
                    ...state,
                    user: {
                    ...state.user,
                    cards: userCards
                    },
                    isUserLoggedIn: state.isUserLoggedIn,
                    selectedLocale: action.locale,
                  }
            }
            return state;
        }
        case DELETE_ADDRESS: {
            if(action.payload) {
                const userAddresses = state.user.addresses ? [...state.user.addresses] : [];
                const addressIndex = userAddresses.indexOf(action.payload.name);
                userAddresses.splice(addressIndex, 1)

                if(userAddresses.length === 1){
                    userAddresses[0].default = true;
                }
                return {
                    ...state,
                   user: {
                    ...state.user,
                    addresses: userAddresses
                    }
                  }
            }
            return state;
        }
        case DELETE_CARD: {
            if(action.payload) {
                const userCards = state.user.cards ? [...state.user.cards] : [];
                const cardIndex = userCards.indexOf(action.payload.cardNumber);
                userCards.splice(cardIndex, 1)

                
                if(userCards.length === 1){
                    userCards[0].default = true;
                }
                return {
                    ...state,
                   user: {
                    ...state.user,
                    cards: userCards
                    }
                  }
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

        case REMOVE_FROM_CART: {

            if(action.payload) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        cart: cartState(state.user.cart, removeItemFromCart(action.payload))
                    }
                }
            }

            return state;
        }

        case RESET_CART: {

            return {
                ...state,
                user: {
                    ...state.user,
                    cart: cartInitialState
                }
            }
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

        case REMOVE_FROM_WISHLIST: {

            if(action.payload) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        wishList: wishlistState(state.user.wishList, removeItemFromWishlist(action.payload))
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