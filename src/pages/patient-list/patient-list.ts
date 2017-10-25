import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PatientEpic } from '../../epics/patient'
import {  PatientDetailsPage} from "../patient-details/patient-details";
import { NgRedux,select } from "ng2-redux";
import { AppState } from "../../reducers/rootReducer";
import { Http,Headers } from "@angular/http";
import { GET_PATIENT } from "../../actions/patient"; 
import { Observable } from "rxjs";

@Component({
  selector: 'page-patient-list',
  templateUrl: 'patient-list.html'
})
export class PatientListPage {

	patientData = [];

	@select((s : AppState)=> s.patient.patientData) patientData$ : Observable<Array<any>>;
	
  constructor(public navCtrl: NavController,private fb: FormBuilder,
			 private ngredux : NgRedux<AppState>,
			 private http : Http,) {
			 
				this.ngredux.dispatch({
				 type : GET_PATIENT
				})
				

				(this.ngredux.getState());	
				
				this.patientData$.subscribe((data)=>{
					
					this.patientData = data
				})
			 }

itemTapped(item,index){

(item);
(index);
this.navCtrl.push(PatientDetailsPage,{
	item,
	index
})
}



}
