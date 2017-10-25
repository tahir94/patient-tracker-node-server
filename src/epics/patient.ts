import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Http, Headers } from '@angular/http';

import { NgRedux,select } from "ng2-redux";
import { AppState } from '../reducers/rootReducer';

import { ADD_PATIENT, ADD_PATIENT_SUCCESS, DELETE,
	 DELETE_SUCCESS,GET_PATIENT,GET_PATIENT_SUCCESS,
	SET_DATA_LOCALLLY,LOCAL_DATA_SUCCESS } from "../actions/patient";

// rxjs imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';

@Injectable()

export class PatientEpic {
	patientArray = [];
	currentUserId : String;
	@select((s : AppState)=> s.patient.patientData) patientData$ : Observable<Array<any>>;
	constructor(private ngRedux: NgRedux<AppState>, public http: Http) { }

	SetDataLocally = (actions$ : ActionsObservable<any>)=>{
		return actions$.ofType(SET_DATA_LOCALLLY)
		.switchMap(({payload})=>{
			console.log('local epic !',payload);
		localStorage.setItem('token',payload._id)	
			return Observable.of()
		})
	}


	GetPatient = (actions$ : ActionsObservable<any>)=>{
		return actions$.ofType(GET_PATIENT)
		.switchMap(()=>{
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			let currentUserId = localStorage.getItem('token');
			console.log(currentUserId);
			
			return this.http.get('http://localhost:3000/hospital/patients/'+ currentUserId, { headers: headers })
			.switchMap(res =>{
				console.log('details res!',res.json());
				// this.patientArray.push(res.json());
				return Observable.of({type : GET_PATIENT_SUCCESS, payload : res.json()})
			})			
		})
	}

	Patient = (actions$: ActionsObservable<any>) => {
		this.patientArray = [];
		return actions$.ofType(ADD_PATIENT)
			.switchMap(({ payload, navCtrl }) => {
				console.log('epic log 1', payload);
				// console.log('current uid',this.currentUserUid);
				
				let headers = new Headers();
				headers.append('Content-Type', 'application/json');
				this.currentUserId  =  localStorage.getItem('token')
				payload.id = this.currentUserId

				console.log(payload);
				
				return this.http.post('http://localhost:3000/hospital/patient', JSON.stringify(payload), { headers: headers })
					.switchMap(res => {
						console.log('epic log 2', res.json());
						
						this.patientArray.push(res.json())
						console.log('epic: patient Array', this.patientArray);
						navCtrl();
						return Observable.of({ type: ADD_PATIENT_SUCCESS})
					})
			})
	}

	Delete = (actions$: ActionsObservable<any>) => {
		return actions$.ofType(DELETE)
			.switchMap(({ payload, navCtrl }) => {
				console.log('epic payload', payload._id);
				return this.http.delete('http://localhost:3000/hospital/patient/' + payload._id)
					.switchMap((res) => {
						console.log('res');
						console.log('delete res :', res);
						if (res) {
							navCtrl();
							console.error(res)
							return Observable.of({ type: DELETE_SUCCESS, payload: res.json() })

						}
					})
			})
	}
}