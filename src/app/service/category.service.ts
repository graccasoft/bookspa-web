import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Treatment} from "../model/treatment";
import {catchError, Observable} from "rxjs";
import {TreatmentCategory} from "../model/treatment-category";
import {Utils} from "../utils/utils";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = Utils.apiBaseUrl() + '/api/categories'
  constructor(private http: HttpClient) { }

  //get treatments
  get(): Observable<TreatmentCategory[]> {
    return this.http.get<TreatmentCategory[]>(`${this.apiUrl}`);
  }

  //save treatment
  save(category: TreatmentCategory): Observable<TreatmentCategory> {
    return this.http.post<TreatmentCategory>(`${this.apiUrl}`, category);
  }
}
