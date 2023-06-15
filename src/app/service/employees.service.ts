import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Treatment} from "../model/treatment";
import {catchError, Observable} from "rxjs";
import {Employee} from "../model/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private apiUrl = '/api/employees'
  constructor(private http: HttpClient) { }

  //get treatments
  get(tenantId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}?tenantId=${tenantId}`);
  }

  //save treatment
  save(Employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}`, Employee);
  }
}
