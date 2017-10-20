import { combineReducers } from 'redux';
import { PatientState,PATIENT_INITIAL_STATE,PatientReducer } from './patient';


export interface AppState {
	patient : PatientState

}

export const INITIAL_STATE = {
	patient : PATIENT_INITIAL_STATE
}

export const RootReducer = combineReducers<AppState>({
	patient : PatientReducer

})