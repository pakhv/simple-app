import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  private url: string = "api/users/"
  users: User[];

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  addUser(){
    this.router.navigate(['/editUser', 0]);
  }

  editUser(id: number){
    this.router.navigate(['/editUser', id]);
  }

  async deleteUser(id: number){
    this.users = undefined;

    this.userService.deleteUser(id);
    await this.getUsers();
  }

  async ngOnInit() {
    await this.getUsers();
  }

  async getUsers(){
    this.users = undefined;

    (await this.userService.getUsers()).subscribe(result =>{
      this.users = result;
    }, error => console.error(error));
  }
}



