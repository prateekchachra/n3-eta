import { UserModel } from './UserReducers';
import { 
    MARK_USER_AS_LOGGED_IN, MARK_USER_AS_LOGGED_OUT 
} from './UserTypes';

 type USER_LOGIN =  { type: string, userSnapShot: UserModel}
 type USER_LOGOUT = { type: string } 

export type USER_ACTIONS = USER_LOGIN
    | USER_LOGOUT;

export const markUserAsLoggedIn = (user: UserModel): USER_ACTIONS => ({
    type: MARK_USER_AS_LOGGED_IN,
    userSnapShot: user
})

export const markUserAsLoggedOut = (): USER_ACTIONS => ({
    type: MARK_USER_AS_LOGGED_OUT,
})