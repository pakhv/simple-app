import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Department } from '../Models/department';
import { DepartmentService } from '../services/department-service';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
})
export class DepartmentComponent implements OnInit {
  private url: string = "api/departments/"
  departments: Department[];

  constructor(private http: HttpClient, private router: Router, 
    private depService: DepartmentService, private userService: UserService) { }

  addDepartment(){
    this.router.navigate(['/editDepartment', 0]);
  }

  editDepartment(id: number){
    this.router.navigate(['/editDepartment', id]);
  }

  async deleteDepartment(id: number){
    this.departments = undefined;

    this.depService.deleteDepartment(id);
    await this.getDepartments();
  }

  async ngOnInit() {
    await this.getDepartments();
  }

  async getDepartments(){
    this.departments = undefined;

    (await this.depService.getDepartments()).subscribe(result =>{
      this.departments = result;
    }, error => console.error(error));
  }
}



