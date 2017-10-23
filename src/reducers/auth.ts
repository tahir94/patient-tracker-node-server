import { tassign } from 'tassign';
import { SIGNUP_SUCCESS } from "../actions/auth";
export interface AuthState {

}

export const AUTH_INITIAL_STATE = {


}

export const AuthReducer = (state: AuthState = AUTH_INITIAL_STATE, action) => {

switch(action.type){

    case SIGNUP_SUCCESS:
    console.log(action.payload);
    

    default:
    return state
}
}