import { Component, OnInit } from '@angular/core';
//import { Router }            from '@angular/router';

import { Employee }          from './employee';
import { EmployeeService }   from './employee.service';

@Component({
  selector: 'employees-list',
  templateUrl: './employees.component.html',
  styleUrls: [ './employees.component.css' ]
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  selectedEmployee: Employee;

  constructor(private employeeService: EmployeeService) {}

  model = new Employee(0,'',0,'')
  editing = false
  submitText = 'Add Employee'

  formReset(){
    this.model = new Employee(0,'',0,'')
    this.editing = false
    this.submitText = 'Add Employee'
  }

  getEmployees(): void {
    this.employeeService
        .getEmployees()
        .then(employees => this.employees = employees);
  }

  submit(): void {
    if(this.editing){
      this.employeeService.update(this.model)
        .then(employee => this.employees.forEach((e, i) => { if (e.id == employee.id) this.employees[i] = employee }));
    }
    else {
    this.employeeService.create(this.model)
      .then(employee => this.employees.push(employee));
    }
    this.formReset()
  }

  edit(employee: Employee){
    this.editing = true
    this.submitText = 'Edit Employee'
    this.model = {...employee}
  }

  delete(employee: Employee): void {
    this.employeeService
        .delete(employee.id)
        .then(() => {
          this.employees = this.employees.filter(e => e !== employee);
        });
  }

  ngOnInit(): void {
    this.getEmployees();
  }


}
