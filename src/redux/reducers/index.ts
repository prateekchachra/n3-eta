import { reducer as offlineQueue } from 'redux-queue-offline';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  offlineQueue,
  routing,
});
export default rootReducer;
