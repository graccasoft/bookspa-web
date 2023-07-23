import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Treatment} from "../model/treatment";
import {catchError, Observable} from "rxjs";
import {Employee} from "../model/employee";
import {Utils} from "../utils/utils";
import { ApiResponse } from '../model/api-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  
  public apiUrl = Utils.apiBaseUrl() + '/api/employees'
  constructor(private http: HttpClient) { }

  //get treatments
  get(tenantId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}?tenantId=${tenantId}`);
  }

  //save treatment
  save(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}`, employee);
  }
  
  toggleAvailability(employee: Employee) : Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}`, employee);
  }

  delete(employeeId: number) : Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${employeeId}`);
  }
}
