import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "../model/booking";
import {TimeSlot} from "../model/time-slot";
import {Utils} from "../utils/utils";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = '/api/bookings'
  constructor(private http: HttpClient) { }

  save(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}`, booking);
  }

  getFreeTimeSlots(tenantId:number, date:Date, duration:number): Observable<TimeSlot[]>{
    const urlDate = Utils.dateToUrlFormat(date)
    return this.http.get<TimeSlot[]>(`${this.apiUrl}/available-slots?tenantId=${tenantId}&date=${urlDate}&duration=${duration}`);
  }
}
