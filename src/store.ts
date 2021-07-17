import wishlistState, { WishlistState } from './redux/wishlist/WishlistReducer';
import { applyMiddleware, combineReducers, createStore, AnyAction } from 'redux';
import cartState, { CartState } from './redux/cart/CartReducer';
import userState, { UserState } from './redux/user/UserReducers';
import loginModalState, { LoginModalState } from './redux/loginModal/LoginModalReducers';
import thunk from 'redux-thunk';

export type RootState = {
    userState: UserState,
    loginModalState: LoginModalState
}

const rootReducer = combineReducers({
    userState,
    loginModalState
});

const middleware = [thunk];

const saveStateToLocalStorage = (state: RootState) => {
    localStorage.setItem("state", JSON.stringify(state));
}

const loadStateFromLocalStorage = () => {
    const stateString = localStorage.getItem("state");
    return stateString ? JSON.parse(stateString) : undefined;
}

const persistedStore = loadStateFromLocalStorage();

export const store = createStore(rootReducer, persistedStore, applyMiddleware(...middleware));

store.subscribe( () => {
    saveStateToLocalStorage(store.getState());
})
