import { Component, Inject } from '@angular/core';
import {Booking} from "../../model/booking";
import {BookingService} from "../../service/booking.service";
import {Tenant} from "../../model/tenant";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {AccountsService} from "../../service/accounts.service";
import {User} from "../../model/user";
import { Utils } from 'src/app/utils/utils';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent {

  tenant! : Tenant | undefined
  booking!: Booking
  bookings: Booking[] = []

  constructor(
    private bookingService: BookingService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private accountsService: AccountsService
  ) {
  }

  today = new Date();
  range = new FormGroup({
    start: new FormControl<Date | null>(new Date(this.today.getFullYear(), this.today.getMonth(), 1)),
    end: new FormControl<Date | null>(new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0)),
  });

  ngOnInit(){
    const user = this.accountsService.userValue as User
    if (user) {
      this.tenant = user.tenant
      console.log(user)
      this.fetchBookings()
    }
  }

  fetchBookings(){
    if( !this.range.value.start ||  !this.range.value.end )
      return;

    const startDate = moment(this.range.value.start).format()
    const endDate = moment(this.range.value.end).format()
    //@ts-ignore
    this.bookingService.getTenantBookings(this.tenant.id, startDate, endDate)
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

  updatePayment(id:number){
    this.selectBooking(id)
    this.openDialog()
  }

  selectBooking (id:number){
    this.booking = this.bookings.filter(t=>  t.id === id)[0]
  }
  openDialog() {
    const dialogRef = this.dialog.open(ReservationPaymentFormDialog,{width:"50%",data:{booking: this.booking}});

    dialogRef.afterClosed().subscribe(result => {
      this.fetchBookings()
    });
  }
}

@Component({
  selector: 'reservation-payment-form-dialog',
  templateUrl: 'reservation-payment-form-dialog.html',
})
export class ReservationPaymentFormDialog {

  protected readonly Utils = Utils;
  booking!: Booking
  constructor(
    @Inject(MAT_DIALOG_DATA) data: { booking: Booking },
    private bookingService: BookingService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ReservationPaymentFormDialog>,) {
    this.booking = data.booking
  }

  calculateTotalAmount():number{
    return this.booking.treatments.reduce((previousValue, currentValue)=> {return previousValue + currentValue.price}, 0)
  }

  savePayment() {
    this.bookingService.savePayment( this.booking ).subscribe((booking)=>{
      this._snackBar.open("Reservation has been saved", "Ok")
      this.dialogRef.close();
    })
  }
}