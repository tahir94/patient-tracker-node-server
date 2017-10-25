import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PatientEpic } from '../../epics/patient'
import { PatientListPage } from "../patient-list/patient-list";
import { NgRedux,select } from "ng2-redux";
import { AppState } from "../../reducers/rootReducer";
import { ADD_PATIENT,GET_PATIENT,SET_DATA_LOCALLLY } from "../../actions/patient";
import {  PatientDetailsPage} from "../patient-details/patient-details";
import { LoginPage } from "../login/login";
import { LOGOUT,GET_DATA_LOCALLY } from "../../actions/auth";
import { Observable } from "rxjs";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	patientForm: FormGroup;
	isMainPage  : boolean = true;
	isPatientForm : boolean = false;
	isPatientList : boolean = true;
	patientData = [];
	genders = [
		{ value: 'male', viewValue: 'Male' },
		{ value: 'female', viewValue: 'Female' }
	]

	@select((s : AppState)=> s.patient.patientData) patientData$ : Observable<Array<any>>;
	@select((s : AppState) => s.auth.userData) userData$ : Observable<Object>;
  constructor(public navCtrl: NavController,private fb: FormBuilder,
             private ngredux : NgRedux<AppState>) {
				
				(this.ngredux.getState());
				
				this.ngredux.dispatch({
					type : GET_PATIENT
				   })
				
				   
				   
	this.userData$.subscribe((data)=>{
		(data);
		if(data){
		
			this.ngredux.dispatch({
			 type : SET_DATA_LOCALLLY,
			 payload : data,
			})		
	}
})
			   
				   
	this.patientForm = this.fb.group({
		patientName: [null,Validators.required],
		patientAge: [null,Validators.required],
		patientAddress: [null,Validators.required],
		gender: [null,Validators.required]
	})

	this.patientData$.subscribe((data)=>{
		
		this.patientData = data
	})
  }

  add(){
	this.isMainPage = false;
	this.isPatientForm = true;  
	this.isPatientList = false;
}

back(){
	this.isMainPage = true;
	this.isPatientForm = false;
	this.isPatientList = true;  
}

addPatient(){
	// (this.currentUserData);
	
	(this.patientForm.value);
	this.ngredux.dispatch({
		type : ADD_PATIENT,
		payload : this.patientForm.value,
		navCtrl :() => {
			this.isMainPage = true;
			this.isPatientList = true;
			this.isPatientForm = false;
		}
		
	})
	// this.ngredux.dispatch({
	// 	type : GET_PATIENT,
	// 	navCtrl : () => this.patientForm.reset()
	// })
	this.patientForm.reset();
}

itemTapped(item,index){
	
	(item);
	(index);
	this.navCtrl.push(PatientDetailsPage,{
		item,
		index
	})
	}

	logout() {

		this.ngredux.dispatch({
			type : LOGOUT,
			navCtrl : () => this.navCtrl.pop()
		})
		// this.navCtrl.push(LoginPage)
	  }
	



}
