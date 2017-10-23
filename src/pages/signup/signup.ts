import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgRedux,select } from "ng2-redux";
import { AppState } from "../../reducers/rootReducer";
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs";
import { SIGNUP } from "../../actions/auth";


@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
  })
  export class SignupPage {
    signupForm : FormGroup;

    constructor(private fb : FormBuilder,
               private ngRedux : NgRedux<AppState>){
      this.signupForm = this.fb.group({
        userName : '',
        userEmail : '',
        userPassword :''
      })
    }

    signup(){
      this.ngRedux.dispatch({
        type : SIGNUP,
        payload : this.signupForm.value
      })
      
      
    }
  
  }