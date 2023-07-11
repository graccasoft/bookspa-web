import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Treatment} from "../model/treatment";
import {catchError, Observable} from "rxjs";
import {Utils} from "../utils/utils";
import { ApiResponse } from '../model/api-response';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  
  
  private apiUrl = Utils.apiBaseUrl() + '/api/treatments'
  constructor(private http: HttpClient) { }

  //get treatments
  get(tenantId: number): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${this.apiUrl}?tenantId=${tenantId}`);
  }

  getPromotions(tenantId: number): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${this.apiUrl}/promotions?tenantId=${tenantId}`);
  }

  //delete
  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}?treatmentId=${id}`)
  }

  //save treatment
  save(treatment: Treatment): Observable<Treatment> {
    return this.http.post<Treatment>(`${this.apiUrl}`, treatment);
  }
}
