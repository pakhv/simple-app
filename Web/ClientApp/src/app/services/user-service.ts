import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../Models/user";

@Injectable({
    providedIn: 'root',
  })
export class UserService{
    private url: string = "api/users/"

    constructor(private http: HttpClient) { }

    async getUsers(){
        let users : User[];
        
        await new Promise(r => setTimeout(r, 500));
    
        return this.http.get<User[]>(this.url + 'GetUsers');
    }

    getUser(id: number){
        return this.http.get<User>(this.url + `GetUser/${id}`);
    }
    
    addUser(user: User){
        this.http.post(this.url + 'AddUser', user).subscribe(result => {}, error => console.error(error));
    }
    
    editUser(id: number, user: User){
        this.http.put(this.url + `EditUser/${id}`, user).subscribe(result => {}, error => console.error(error));
    }
    
    deleteUser(id: number){
        this.http.delete(this.url + `DeleteUser/${id}`, {}).subscribe(result => {}, error => console.error(error));
    }
}