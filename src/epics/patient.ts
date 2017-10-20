import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Http, Headers } from '@angular/http';

import { NgRedux } from "ng2-redux";
import { AppState } from '../reducers/rootReducer';

import { ADD_PATIENT } from "../actions/patient";

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
	constructor( private ngRedux: NgRedux<AppState>,public http: Http) {}

	Patient = (actions$ : ActionsObservable<any>) => {
		return actions$.ofType(ADD_PATIENT)
		.switchMap(({payload})=>{
			console.log(payload);
			let headers = new Headers();
			headers.append('Content-Type','application/json');

			this.http.post('http://localhost:3000/addPatient',JSON.stringify(payload), {headers : headers})
			.subscribe(res => {
				console.log(res.json());
				
			})
			return Observable.of()
		})
	}
}