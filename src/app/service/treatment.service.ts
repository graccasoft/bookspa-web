import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Treatment} from "../model/treatment";
import {catchError, Observable} from "rxjs";
import {Utils} from "../utils/utils";

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

  //save treatment
  save(treatment: Treatment): Observable<Treatment> {
    return this.http.post<Treatment>(`${this.apiUrl}`, treatment);
  }
}
