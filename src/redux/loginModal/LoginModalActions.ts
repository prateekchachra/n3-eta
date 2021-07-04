import { SHOW_LOGIN_MODAL } from "./LoginModalTypes";

export type LOGIN_MODAL_ACTIONS = 
 { type: string, payload: boolean}


export const showLoginModal = (showLoginModalFlag: boolean): LOGIN_MODAL_ACTIONS => ({
    type: SHOW_LOGIN_MODAL, 
    payload: showLoginModalFlag
})