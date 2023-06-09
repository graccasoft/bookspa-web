import { Component } from '@angular/core';
import {TreatmentService} from "../../service/treatment.service";
import {Tenant} from "../../model/tenant";
import {Treatment} from "../../model/treatment";
import {Client} from "../../model/client";
import {Booking} from "../../model/booking";
import {BookingService} from "../../service/booking.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-reserve-public',
  templateUrl: './reserve-public.component.html',
  styleUrls: ['./reserve-public.component.css']
})
export class ReservePublicComponent {

  tenant: Tenant = new Tenant(1)
  treatments: Treatment[] = []
  treatment: Treatment = new Treatment(0,'','',0,0,0,this.tenant)
  client: Client = new Client(0,'','','','','','','',this.tenant)
  booking: Booking = new Booking(0,new Date(), new Date(),0,'NEW', this.client,this.treatment)
  tomorrow = new Date()

  constructor(
    private treatmentService: TreatmentService,
    private bookingService: BookingService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(){
    this.tomorrow.setDate(this.tomorrow.getDate() + 1)
    this.fetchTreatments()
  }
  fetchTreatments(){
    this.treatmentService.get(this.tenant.id)
      .subscribe(treatments => this.treatments = treatments)
  }

  saveBooking(){
    this.booking.treatment = this.treatment
    console.log(this.treatment)
    this.bookingService.save(this.booking)
      .subscribe(booking=>{
        this._snackBar.open("Booking successfully submitted", "Ok")
      })
  }
}
