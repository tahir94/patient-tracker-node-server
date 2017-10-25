import { combineReducers } from 'redux';
import { PatientState, PATIENT_INITIAL_STATE, PatientReducer } from './patient';
import { AuthState, AUTH_INITIAL_STATE, AuthReducer } from './auth';


export interface AppState {
	patient: PatientState,
	auth: AuthState

}

export const INITIAL_STATE = {
	patient: PATIENT_INITIAL_STATE,
	auth: AUTH_INITIAL_STATE
}

export const RootReducer = combineReducers<AppState>({
	patient: PatientReducer,
	auth: AuthReducer

})