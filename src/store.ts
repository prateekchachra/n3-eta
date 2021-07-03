import { applyMiddleware, combineReducers, createStore } from 'redux';
import cartState, { CartState } from './redux/cart/CartReducer';

export type RootState = {
    cartState: CartState
}

const rootReducer = combineReducers({
    cartState
});

const loadStateFromLocalStorage = () => {
    const stateString = localStorage.getItem("state");
    return stateString ? JSON.parse(stateString) : undefined;
}

const persistedStore = loadStateFromLocalStorage();

export const store = createStore(rootReducer, persistedStore);

store.subscribe( () => {
    localStorage.setItem("state", JSON.stringify(store.getState()));
})
