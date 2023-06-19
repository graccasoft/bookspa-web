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
    return this.http.post<ApiResponse>(`${this.apiUrl}/${tenantId}/users`, user);
  }

}
