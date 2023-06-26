import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Booking } from 'src/app/model/booking';
import { BookingService } from 'src/app/service/booking.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {



  booking!: Booking
  bookingCancelled = false

  constructor(
    private bookingService: BookingService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(s => {
      this.bookingService.getMyBooking(s["reference"])
        .subscribe(booking => { this.booking = booking })
    });
  }

  protected readonly Utils = Utils;
  calculateTotalAmount(): number {
    return this.booking.treatments.reduce((previousValue, currentValue) => { return previousValue + currentValue.price }, 0)
  }

  cancelBooking() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Bookings',
        text: 'Are you sure you want to cancel your booking?',
        cancelText: 'No',
        confirmText: 'Yes'
      }
    });

    dialog.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.bookingService.cancelMyBooking (this.booking.reference)
          .subscribe(resp => this.bookingCancelled = true)

      }
    })
  }
}
