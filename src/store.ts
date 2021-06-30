import { applyMiddleware, combineReducers, createStore } from 'redux';
import cartState from './redux/reducers/CartReducer';

const rootReducer = combineReducers({
    cartState
});

export const store = createStore(rootReducer);