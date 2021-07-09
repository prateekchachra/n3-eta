import { UserModel } from './UserReducers';
import { 
    MARK_USER_AS_LOGGED_IN, MARK_USER_AS_LOGGED_OUT, 
    SET_CURRENT_LOCALE
} from './UserTypes';

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

export const markUserAsLoggedOut = (): USER_ACTIONS => ({
    type: MARK_USER_AS_LOGGED_OUT,
})
export const setCurrentLocale = (locale: string): USER_ACTIONS => ({
    type: SET_CURRENT_LOCALE,
    locale,
})