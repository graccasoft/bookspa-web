import { Component } from '@angular/core';
import {Booking} from "../../model/booking";
import {BookingService} from "../../service/booking.service";
import {Tenant} from "../../model/tenant";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent {

  tenant : Tenant = new Tenant(1)
  bookings: Booking[] = []

  constructor(
    private bookingService: BookingService
  ) {
  }

  ngOnInit(){
    this.fetchBookings()
  }

  fetchBookings(){
    this.bookingService.getTenantBookings(this.tenant.id)
      .subscribe(bookings=> this.bookings = bookings)
  }
}
