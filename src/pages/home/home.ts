import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PatientEpic } from '../../epics/patient'
import { NgRedux } from "ng2-redux";
import { AppState } from "../../reducers/rootReducer";
import { ADD_PATIENT } from "../../actions/patient";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	patientForm: FormGroup;
	isMainPage  : boolean = true;
	isPatientForm : boolean = false;
	genders = [
		{ value: 'male', viewValue: 'Male' },
		{ value: 'female', viewValue: 'Female' }
	]
	
  constructor(public navCtrl: NavController,private fb: FormBuilder,
             private ngredux : NgRedux<AppState>) {
	  
	this.patientForm = this.fb.group({
		patientName: '',
		patientAge: '',
		patientAddress: '',
		gender: ''
	})
  }

  add(){
	this.isMainPage = false;
    this.isPatientForm = true;  
}

back(){
	this.isMainPage = true;
    this.isPatientForm = false;  
}

addPatient(){
	console.log(this.patientForm.value);
	this.ngredux.dispatch({
		type : ADD_PATIENT,
		payload : this.patientForm.value
	})
}

}
