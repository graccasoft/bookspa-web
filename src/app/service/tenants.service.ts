import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "../model/booking";
import {TimeSlot} from "../model/time-slot";
import {Utils} from "../utils/utils";
import {Treatment} from "../model/treatment";
import {CategorisedTreatments} from "../model/categorised-treatments";
import {Tenant} from "../model/tenant";
import {User} from "../model/user";
import {ApiResponse} from "../model/api-response";

@Injectable({
  providedIn: 'root'
})
export class TenantsService {
  private apiUrl = Utils.apiBaseUrl() + '/api/tenants'
  constructor(private http: HttpClient) { }

  save(tenant: Tenant): Observable<Tenant> {
    return this.http.post<Tenant>(`${this.apiUrl}`, tenant);
  }

  get(): Observable<Tenant[]>{
    return this.http.get<Tenant[]>(`${this.apiUrl}`)
  }

  getTenant(tenantId: number): Observable<Tenant>{
    return this.http.get<Tenant>(`${this.apiUrl}/${tenantId}`)
  }
  getUsers(tenantId:number): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/${tenantId}/users`)
  }

  saveUser(user: User, tenantId:number): Observable<ApiResponse>{
    if( user.id && user.id > 0 ){
      return this.http.put<ApiResponse>(`${this.apiUrl}/${tenantId}/users/${user.id}`, user);
    }else{
      return this.http.post<ApiResponse>(`${this.apiUrl}/${tenantId}/users`, user);
    }
  }

  toggleActive(tenant: Tenant) : Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.apiUrl}/${tenant.id}/toggle-status`,tenant);
  }

  delete(tenantId: number) : Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${tenantId}`);
  }

  deleteUser(userId: number, tenantId: number) : Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${tenantId}/users/${userId}`);
  }

}
