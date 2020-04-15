import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from '../services/user-service';
import { User } from '../Models/user';
import { DepartmentService } from '../services/department-service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {
  user: User;
  id: number;
  depIds: number[];

  constructor(private actRouter: ActivatedRoute, private router: Router, 
    private userService: UserService, private depService: DepartmentService) 
  {
    this.user = {
      firstName: "",
      lastName: "",
      departmentId: 0
    };
  }

  saveUser(){
    if (this.id)
      this.userService.editUser(this.id, this.user);
    else
      this.userService.addUser(this.user);

    this.router.navigate(['/']);
  }

  cancel(){
    this.router.navigate(['/']);
  }

  async ngOnInit() {
    this.actRouter.paramMap.subscribe(params =>{
      const id = +params.get('id');
      if (id){
         this.getUser(id);
      }
    });

    (await this.depService.getDepartments()).subscribe(result =>{
      this.depIds = result.map(dep => dep.departmentId);
    });
  }

  getUser(id: number) {
    if (id != 0){
      this.userService.getUser(id).subscribe((user: User) => {
        this.user.departmentId = user.departmentId;
        this.user.firstName = user.firstName;
        this.user.lastName = user.lastName;
        this.id = id;
      })
    }
  }

  idValid(){
    return this.depIds.includes(this.user.departmentId) && 
      this.user.firstName != "" && 
      this.user.lastName != "";
  }
}