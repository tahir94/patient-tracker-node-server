import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgRedux,select } from "ng2-redux";
import { AppState } from "../../reducers/rootReducer";
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs";
import { SignupPage } from "../signup/signup";
import { LOGIN } from "../../actions/auth";
import { HomePage } from "../home/home";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
  })
  export class LoginPage {


loginForm : FormGroup;
    constructor(private fb : FormBuilder,
                private navCtrl: NavController,
                private ngRedux : NgRedux<AppState>){
        this.loginForm  = this.fb.group({
            userEmail : '',
            userPassword : ''
        })
    }

    login(){
        // console.log(this.loginForm.value);
        this.ngRedux.dispatch({
            type : LOGIN,
            payload : this.loginForm.value,
            navCtrl : () => this.navCtrl.push(HomePage)
        })
        
    }
    goToSignup(){
        this.navCtrl.push(SignupPage)
    }
  }