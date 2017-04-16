"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { Router }            from '@angular/router';
var employee_1 = require("./employee");
var employee_service_1 = require("./employee.service");
var EmployeesComponent = (function () {
    function EmployeesComponent(employeeService) {
        this.employeeService = employeeService;
        this.model = new employee_1.Employee(0, '', 0, '');
        this.editing = false;
        this.submitText = 'Add Employee';
    }
    EmployeesComponent.prototype.formReset = function () {
        this.model = new employee_1.Employee(0, '', 0, '');
        this.editing = false;
        this.submitText = 'Add Employee';
    };
    EmployeesComponent.prototype.getEmployees = function () {
        var _this = this;
        this.employeeService
            .getEmployees()
            .then(function (employees) { return _this.employees = employees; });
    };
    EmployeesComponent.prototype.submit = function () {
        var _this = this;
        if (this.editing) {
            this.employeeService.update(this.model)
                .then(function (employee) { return _this.employees.forEach(function (e, i) { if (e.id == employee.id)
                _this.employees[i] = employee; }); });
        }
        else {
            this.employeeService.create(this.model)
                .then(function (employee) { return _this.employees.push(employee); });
        }
        this.formReset();
    };
    EmployeesComponent.prototype.edit = function (employee) {
        this.editing = true;
        this.submitText = 'Edit Employee';
        this.model = __assign({}, employee);
    };
    EmployeesComponent.prototype.delete = function (employee) {
        var _this = this;
        this.employeeService
            .delete(employee.id)
            .then(function () {
            _this.employees = _this.employees.filter(function (e) { return e !== employee; });
        });
    };
    EmployeesComponent.prototype.ngOnInit = function () {
        this.getEmployees();
    };
    return EmployeesComponent;
}());
EmployeesComponent = __decorate([
    core_1.Component({
        selector: 'employees-list',
        templateUrl: './employees.component.html',
        styleUrls: ['./employees.component.css']
    }),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeesComponent);
exports.EmployeesComponent = EmployeesComponent;
//# sourceMappingURL=employees.component.js.map