import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Treatment} from "../model/treatment";
import {catchError, Observable} from "rxjs";
import {Client} from "../model/client";
import {Utils} from "../utils/utils";
import { ApiResponse } from '../model/api-response';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  public apiUrl = Utils.apiBaseUrl() + '/api/clients'
  constructor(private http: HttpClient) { }

  //get treatments
  get(tenantId: number): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}?tenantId=${tenantId}`);
  }

  //save treatment
  save(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}`, client);
  }

  delete(clientId: number): Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${clientId}`);
  }
}
