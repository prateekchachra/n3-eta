import { 
    MARK_USER_AS_LOGGED_IN, MARK_USER_AS_LOGGED_OUT 
} from './UserTypes';

export type USER_ACTIONS =
    { type: string, userToken: string}


export const markUserAsLoggedIn = (userToken: string): USER_ACTIONS => ({
    type: MARK_USER_AS_LOGGED_IN,
    userToken: userToken
})

export const markUserAsLoggedOut = (userToken: string): USER_ACTIONS => ({
    type: MARK_USER_AS_LOGGED_OUT,
    userToken: userToken
})