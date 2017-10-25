import { tassign } from 'tassign';
import { GET_PATIENT_SUCCESS,DELETE, ADD_PATIENT, ADD_PATIENT_SUCCESS, LOCAL_DATA_SUCCESS, DELETE_SUCCESS } from '../actions/patient';


export interface PatientState {
	patientData: any;

}

export const PATIENT_INITIAL_STATE = {
	patientData: []

}

export const PatientReducer = (state: PatientState = PATIENT_INITIAL_STATE, action) => {

	switch (action.type) {

		case ADD_PATIENT_SUCCESS:
			console.log(action.payload);

			// return tassign({ patientData: action.payload });

		case GET_PATIENT_SUCCESS : 
		console.log(action.payload);
		
		return tassign({patientData : action.payload})

		case DELETE_SUCCESS:
			console.warn('red < ', action.payload)

			state.patientData.forEach((ele, i) => {
				console.warn('ELE ', ele)
				if (ele._id.toLowerCase() === action.payload.id.toLowerCase()) {
					let demo = state.patientData.splice(i, 1);
					return tassign({ patientData: demo })
				}
			})
		// return state;
		default:
			return state;

	}

}