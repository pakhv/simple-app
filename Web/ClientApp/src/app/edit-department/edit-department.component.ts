import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'
import { DepartmentService } from '../services/department-service';
import { Department } from '../Models/department';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html'
})
export class EditDepartmentComponent implements OnInit {
  depName: string;
  id: number;

  constructor(private actRouter: ActivatedRoute, private router: Router, private depService: DepartmentService) {
    this.depName = "";
  }

  saveDepartment(){
    let department: Department ={
      departmentId: 0,
      name: this.depName,
      users: null
    }
    
    if (this.id)
      this.depService.editDepartment(this.id, department);
    else
      this.depService.addDepartment(department);

    this.router.navigate(['/']);
  }

  cancel(){
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.actRouter.paramMap.subscribe(params =>{
      const id = +params.get('id');
      if (id){
         this.getDep(id);
      }
    })
  }

  getDep(id: number) {
    if (id != 0){
      this.depService.getDepartment(id).subscribe((dep: Department) => {
        this.depName = dep.name;
        this.id = dep.departmentId;
      })
    }
  }

  depValid(){
    return (this.depName != "");
  }
}