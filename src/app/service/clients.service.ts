import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Treatment} from "../model/treatment";
import {catchError, Observable} from "rxjs";
import {Client} from "../model/client";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = '/api/clients'
  constructor(private http: HttpClient) { }

  //get treatments
  get(tenantId: number): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}?tenantId=${tenantId}`);
  }

  //save treatment
  save(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}`, client);
  }
}
