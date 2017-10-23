import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Http, Headers } from '@angular/http';

import { NgRedux,select } from "ng2-redux";
import { AppState } from '../reducers/rootReducer';
import { SIGNUP,SIGNUP_SUCCESS } from "../actions/auth";
// rxjs imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';

@Injectable()

export class AuthEpic {
    
    constructor(private http : Http){}

    Signup = (actions$ : ActionsObservable<any>)=>{
        return actions$.ofType(SIGNUP)
        .switchMap(({payload})=>{
            console.log('epic payload',payload);
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('http://localhost:3000/auth/signup', payload, {headers: headers})
            .subscribe(res => {
              console.log('auth res in epic !',res);
            });
return Observable.of()

            // return Observable.of({type : SIGNUP_SUCCESS , payload : payload});
        })
    }
}