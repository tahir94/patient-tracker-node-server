import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PatientEpic } from '../../epics/patient';
import { NgRedux, select } from "ng2-redux";
import { AppState } from "../../reducers/rootReducer";
import { DELETE } from "../../actions/patient";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";

@Component({
	selector: 'page-patient-details',
	templateUrl: 'patient-details.html'
})
export class PatientDetailsPage {
	selectedItem: any;
	selectedIndex: number;

	constructor(public navCtrl: NavController, navParams: NavParams,
		private fb: FormBuilder,
		private http: Http,
		private ngredux: NgRedux<AppState>) {


		(this.ngredux.getState());
		this.selectedItem = navParams.get('item');
		this.selectedIndex = navParams.get('ndex')
	}

	deletePatient(deletePatient) {
		(deletePatient);
		this.ngredux.dispatch({
			type: DELETE,
			payload: deletePatient,
			navCtrl: () => this.navCtrl.pop()
		})
	}

}
