import { Component } from '@angular/core';
import {Booking} from "../../model/booking";
import {BookingService} from "../../service/booking.service";
import {Tenant} from "../../model/tenant";
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent {

  tenant : Tenant = new Tenant(1)
  bookings: Booking[] = []

  constructor(
    private bookingService: BookingService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(){
    this.fetchBookings()
  }

  fetchBookings(){
    this.bookingService.getTenantBookings(this.tenant.id)
      .subscribe(bookings=> this.bookings = bookings)
  }

  cancelBooking(bookingId:number){
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Bookings',
        text: 'Are you sure you want to delete this booking?',
        cancelText: 'No',
        confirmText: 'Yes'
      }
    });

    dialog.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.bookingService.cancelBooking(bookingId)
          .subscribe( resp => this.fetchBookings())
          this._snackBar.open("Booking has been cancelled", "Ok")
      }
    })


  }
}
