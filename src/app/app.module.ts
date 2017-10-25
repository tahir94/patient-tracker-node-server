import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PatientDetailsPage } from "../pages/patient-details/patient-details";
import { SignupPage } from "../pages/signup/signup";
import { LoginPage } from "../pages/login/login";

// redux imports
import { combineReducers } from 'redux'
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { RootReducer, AppState, INITIAL_STATE } from '../reducers/rootReducer';
import { createEpicMiddleware } from 'redux-observable';
import { PatientEpic } from '../epics';
import { AuthEpic } from '../epics';


@NgModule({
  declarations: [
    MyApp,
	HomePage,
	PatientDetailsPage,
	LoginPage,
	SignupPage
  ],
  imports: [
	HttpModule,
    BrowserModule,
	IonicModule.forRoot(MyApp),
	NgReduxModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	HomePage,
	PatientDetailsPage,
	LoginPage,
	SignupPage
  ],
  providers: [
	
	PatientEpic,AuthEpic,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
	constructor(ngRedux: NgRedux<AppState>,
		private patientEpic: PatientEpic,
	    private authEpic : AuthEpic){

		const middleware = [
			createEpicMiddleware(this.patientEpic.Patient),
			createEpicMiddleware(this.patientEpic.Delete),
			createEpicMiddleware(this.patientEpic.GetPatient),
			createEpicMiddleware(this.authEpic.Signup),
			createEpicMiddleware(this.authEpic.Login),
			createEpicMiddleware(this.patientEpic.SetDataLocally),
			createEpicMiddleware(this.authEpic.Logout),
			createEpicMiddleware(this.authEpic.GetDataLocal),
		]

		ngRedux.configureStore(RootReducer, INITIAL_STATE, middleware)
	}
	
}
