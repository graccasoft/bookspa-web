import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Industry} from "../model/industry";

@Injectable({
  providedIn: 'root'
})
export class IndustryService {

  private apiUrl = '/api/industries';

  constructor(private httpClient: HttpClient) { }

  saveIndustry(industry: any): Observable<Industry> {
    return this.httpClient.post<any>(`${this.apiUrl}`, industry);
  }

  getAllIndustries(): Observable<Industry[]> {
    return this.httpClient.get<Industry[]>(`${this.apiUrl}`);
  }

  getIndustryById(id: number): Observable<Industry> {
    return this.httpClient.get<Industry>(`${this.apiUrl}/${id}`);
  }

  updateIndustry(id: number, industry: any): Observable<Industry> {
    return this.httpClient.put<Industry>(`${this.apiUrl}/${id}`, industry);
  }
}
