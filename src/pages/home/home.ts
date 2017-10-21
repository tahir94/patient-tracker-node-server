import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PatientEpic } from '../../epics/patient'
import { PatientListPage } from "../patient-list/patient-list";
import { NgRedux,select } from "ng2-redux";
import { AppState } from "../../reducers/rootReducer";
import { ADD_PATIENT,GET_PATIENT } from "../../actions/patient";
import {  PatientDetailsPage} from "../patient-details/patient-details";

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
	
  constructor(public navCtrl: NavController,private fb: FormBuilder,
             private ngredux : NgRedux<AppState>) {
				
				console.log(this.ngredux.getState());
				
				this.ngredux.dispatch({
					type : GET_PATIENT
				   })
				   
	this.patientForm = this.fb.group({
		patientName: '',
		patientAge: '',
		patientAddress: '',
		gender: ''
	})

	this.patientData$.subscribe((data)=>{
		console.log('home log',data);
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
	console.log(this.patientForm.value);
	this.ngredux.dispatch({
		type : ADD_PATIENT,
		payload : this.patientForm.value,
		navCtrl :() => this.navCtrl.push(PatientListPage)

	})
}

itemTapped(item,index){
	
	console.log(item);
	console.log(index);
	this.navCtrl.push(PatientDetailsPage,{
		item,
		index
	})
	}
	



}
