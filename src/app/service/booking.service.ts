import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "../model/booking";
import {TimeSlot} from "../model/time-slot";
import {Utils} from "../utils/utils";
import {Treatment} from "../model/treatment";
import {CategorisedTreatments} from "../model/categorised-treatments";
import {Tenant} from "../model/tenant";
import {Employee} from "../model/employee";
import { ApiResponse } from '../model/api-response';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = Utils.apiBaseUrl() + '/api/bookings'
  private onlineBookingApiUrl = Utils.apiBaseUrl() + '/api/online-booking'
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
  savePayment(booking: Booking): Observable<ApiResponse>{
    return this.http.patch<ApiResponse> (`${this.apiUrl}`, booking)
  }

  /* public online booking */

  bookOnline(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.onlineBookingApiUrl}`, booking);
  }
  getFreeTimeSlots(tenantId:number, employeeId:number, date:Date, duration:number): Observable<TimeSlot[]>{
    const urlDate = Utils.dateToUrlFormat(date)
    return this.http.get<TimeSlot[]>(`${this.onlineBookingApiUrl}/available-slots?tenantId=${tenantId}&employeeId=${employeeId}&date=${urlDate}&duration=${duration}`);
  }
  getTreatments(tenantId: number): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${this.onlineBookingApiUrl}/treatments?tenantId=${tenantId}`);
  }

  getCategorisedTreatments(tenantId: number): Observable<CategorisedTreatments[]> {
    return this.http.get<CategorisedTreatments[]>(`${this.onlineBookingApiUrl}/categorised-treatments?tenantId=${tenantId}`);
  }

  getTenant(reference: string): Observable<Tenant> {
    return this.http.get<Tenant>(`${this.onlineBookingApiUrl}/tenants?reference=${reference}`);
  }
  cancelMyBooking(reference: string): Observable<any>{
    return this.http.delete(`${this.onlineBookingApiUrl}/bookings/${reference}`)
  }
  getMyBooking(reference: string): Observable<Booking>{
    return this.http.get<Booking>(`${this.onlineBookingApiUrl}/bookings/${reference}`)
  }

  //todo: remove phone numbers and show first and last name alone
  getEmployees(tenantId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.onlineBookingApiUrl}/employees?tenantId=${tenantId}`);
  }
}
