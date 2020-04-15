import { HttpClient } from "@angular/common/http";
import { Department } from "../Models/department";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
export class DepartmentService{
    private url: string = "api/departments/"

    constructor(private http: HttpClient) { }

    async getDepartments(){
        let departments : Department[];
        
        await new Promise(r => setTimeout(r, 500));
    
        return this.http.get<Department[]>(this.url + 'GetDepartments');
    }

    getDepartment(id: number){
        return this.http.get<Department>(this.url + `GetDepartment/${id}`);
    }
    
    addDepartment(department: Department){
        this.http.post(this.url + 'AddDepartment', department).subscribe(result => {}, error => console.error(error));
    }
    
    editDepartment(id: number, department: Department){
        this.http.put(this.url + `EditDepartment/${id}`, department).subscribe(result => {}, error => console.error(error));
    }
    
    deleteDepartment(id: number){
        this.http.delete(this.url + `DeleteDepartment/${id}`, {}).subscribe(result => {}, error => console.error(error));
    }
}