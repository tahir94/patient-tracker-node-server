import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


// redux imports
import { combineReducers } from 'redux'
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { RootReducer, AppState, INITIAL_STATE } from '../reducers/rootReducer';
import { createEpicMiddleware } from 'redux-observable';
import { PatientEpic } from '../epics';

@NgModule({
  declarations: [
    MyApp,
    HomePage
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
    HomePage
  ],
  providers: [
	
	PatientEpic,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
	constructor(ngRedux: NgRedux<AppState>,
		private patientEpic: PatientEpic){

		const middleware = [
			createEpicMiddleware(this.patientEpic.Patient),
			// createEpicMiddleware(this.patientEpic.saveDataLocally),
			// createEpicMiddleware(this.patientEpic.deleteInd)
		]

		ngRedux.configureStore(RootReducer, INITIAL_STATE, middleware)
	}
	
}
