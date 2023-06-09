import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "../model/booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = '/api/bookings'
  constructor(private http: HttpClient) { }

  save(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}`, booking);
  }
}
