import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgRedux,select } from "ng2-redux";
import { AppState } from "../../reducers/rootReducer";
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs";
import { SIGNUP } from "../../actions/auth";
import { HomePage } from "../home/home";
import { EmailValidator } from '../../validators/email';

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
  })
  export class SignupPage {
    signupForm : FormGroup;

    constructor(private fb : FormBuilder,
			   private ngRedux : NgRedux<AppState>,
			   private navCtrl : NavController){
      this.signupForm = this.fb.group({
        userName : '',
        // userEmail : [null, Validators.pattern("^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$")],
		userEmail : ['', Validators.compose([Validators.required, EmailValidator.isValid])],
		userPassword :[null, Validators.compose([Validators.minLength(6), Validators.required])]
      })
    }

    signup(){
      this.ngRedux.dispatch({
        type : SIGNUP,
		payload : this.signupForm.value,
		navCtrl : ()=> this.navCtrl.push(HomePage),
		// signupPage : () => this.navCtrl.push(SignupPage)
		// signUpPage
      })
      
      
    }
  
  }