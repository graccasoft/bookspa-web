import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "../model/booking";
import {TimeSlot} from "../model/time-slot";
import {Utils} from "../utils/utils";
import {Treatment} from "../model/treatment";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = '/api/bookings'
  private onlineBookingApiUrl = '/api/online-booking'
  constructor(private http: HttpClient) { }

  save(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}`, booking);
  }

  getTenantBookings(tenantId: number): Observable<Booking[]>{
    return this.http.get<Booking[]>(`${this.apiUrl}?tenantId=${tenantId}`)
  }

  cancelBooking(bookingId: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${bookingId}`)
  }

  /* public online booking */

  bookOnline(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.onlineBookingApiUrl}`, booking);
  }
  getFreeTimeSlots(tenantId:number, date:Date, duration:number): Observable<TimeSlot[]>{
    const urlDate = Utils.dateToUrlFormat(date)
    return this.http.get<TimeSlot[]>(`${this.onlineBookingApiUrl}/available-slots?tenantId=${tenantId}&date=${urlDate}&duration=${duration}`);
  }
  getTreatments(tenantId: number): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${this.onlineBookingApiUrl}/treatments?tenantId=${tenantId}`);
  }
}
