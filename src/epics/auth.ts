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
import { LOGIN,LOGIN_SUCCESS,LOGOUT,LOGOUT_SUCCESS,GET_DATA_LOCALLY } from "../actions/auth";

@Injectable()

export class AuthEpic {
    
    constructor(private http : Http){}

    Signup = (actions$ : ActionsObservable<any>)=>{
        return actions$.ofType(SIGNUP)
        .switchMap(({payload,navCtrl})=>{
            
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

           return this.http.post('http://localhost:3000/auth/signup', payload, {headers: headers})
            .switchMap(res => {
				if(res.status == 303){									
			  }
			  else {
				  
				navCtrl()
				return Observable.of({type : SIGNUP_SUCCESS, payload : res.json()})
			  }
			  
            });
        })
    }


    Login = (actions$ : ActionsObservable<any>)=>{
        return actions$.ofType(LOGIN)
        .switchMap(({payload,navCtrl})=>{
         
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this.http.post('http://localhost:3000/auth/login', payload, {headers: headers})
                .switchMap(res =>{
                    
                    if(res.status == 404){               
                    }
                    navCtrl();
                    return Observable.of({type : LOGIN_SUCCESS,payload : res.json()})                    
                })
        })
	}
	
	Logout = (actions$ : ActionsObservable<any>)=>{
		return actions$.ofType(LOGOUT)
		.switchMap(({navCtrl})=>{
			localStorage.removeItem('token')
			navCtrl();
			return Observable.of()
		})
	}

	GetDataLocal = (actions$ : ActionsObservable<any>)=>{
		return actions$.ofType(GET_DATA_LOCALLY)
		.switchMap(({navCtrl,HomeCtrl})=>{
			if(localStorage.getItem('token')){
				navCtrl();
			}
			return Observable.of()
		})
	}
}