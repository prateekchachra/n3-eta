import { applyMiddleware, combineReducers, createStore } from 'redux';
import cartState from './redux/cart/CartReducer';

const rootReducer = combineReducers({
    cartState
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
