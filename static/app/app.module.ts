import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

//import { AppRoutingModule } from './app-routing.module';

import { AppComponent }         from './app.component';
import { EmployeesComponent }   from './employees.component';
import { EmployeeService }          from './employee.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
    //AppRoutingModule
  ],
  declarations: [
    AppComponent,
    EmployeesComponent
  ],
  providers: [ EmployeeService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
