import { USER_ACTIONS } from './UserActions';
import { MARK_USER_AS_LOGGED_IN, MARK_USER_AS_LOGGED_OUT } from './UserTypes';

export type UserState = {
    isLoggedIn: boolean,
    userToken: string
}

const initialState = {
    isLoggedIn: false,
    userToken: ''
}

const userState = (
    state: UserState = initialState,
    action: USER_ACTIONS
) => {
    switch(action.type) {

        case MARK_USER_AS_LOGGED_IN: {

            const userToken: string = action.userToken;
            if(userToken) {
                const user: UserState = {
                    userToken: userToken,
                    isLoggedIn: true
                }
                return { ...state, state: Object.assign({}, state, user)}
            }
            return state;
        }

        case MARK_USER_AS_LOGGED_OUT: {

            if(state.isLoggedIn) {
                return { ...state, state: initialState}
            }
            return state;
        }
        
        default:
            return state;
    }
}

export default userState;