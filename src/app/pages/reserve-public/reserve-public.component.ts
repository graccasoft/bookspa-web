import { Component } from '@angular/core';
import {TreatmentService} from "../../service/treatment.service";
import {Tenant} from "../../model/tenant";
import {Treatment} from "../../model/treatment";
import {Client} from "../../model/client";
import {Booking} from "../../model/booking";
import {BookingService} from "../../service/booking.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatChipListboxChange} from "@angular/material/chips";
import {Utils} from "../../utils/utils";

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
  availableTimeSlots: String[] = []
  selectedTimeSlot = "00:00"
  displayDate = new Date()

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

  fetchTimeSlots(date:Date){
    this.bookingService.getFreeTimeSlots(this.tenant.id, date, this.booking.duration)
      .subscribe(timeSlots=>{
        this.availableTimeSlots = []
        timeSlots.map((timeSlot)=>{
          this.availableTimeSlots.push( Utils.dateToTimeSlot(timeSlot.startTime) )
        })
      })

  }
  timeSlotSelected(timeSlot:MatChipListboxChange){
    if( timeSlot.value != undefined ) {
      const timeParts = timeSlot.value.split(":")
      let tmpDate = this.booking.bookingDate
      tmpDate.setHours(parseInt(timeParts[0]))
      tmpDate.setMinutes(parseInt(timeParts[1]))

      this.displayDate = tmpDate
      this.booking.bookingDate = tmpDate
      console.log(this.booking.bookingDate)
    }
  }

  saveBooking(){
    this.booking.treatment = this.treatment
    this.bookingService.save(this.booking)
      .subscribe(booking=>{
        this._snackBar.open("Booking successfully submitted", "Ok")
      })
  }
}
