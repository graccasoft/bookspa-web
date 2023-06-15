import { Component } from '@angular/core';
import {Tenant} from "../../model/tenant";
import {Treatment} from "../../model/treatment";
import {Client} from "../../model/client";
import {Booking} from "../../model/booking";
import {BookingService} from "../../service/booking.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatChipListboxChange} from "@angular/material/chips";
import {Utils} from "../../utils/utils";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { CategorisedTreatments } from 'src/app/model/categorised-treatments';

@Component({
  selector: 'app-reserve-public',
  templateUrl: './reserve-public.component.html',
  styleUrls: ['./reserve-public.component.css']
})
export class ReservePublicComponent {

  tenant: Tenant = new Tenant(1)
  treatmentCategories: CategorisedTreatments[] = []
  bookingTreatments: Treatment[] = []  //= new Treatment(0,'','',0,0,0,this.tenant)
  client: Client = new Client(0,'','','','','','','',this.tenant)
  booking: Booking = new Booking(0,new Date(), new Date(),0,'NEW', this.client,this.bookingTreatments,'')
  tomorrow = new Date()
  availableTimeSlots: String[] = []
  selectedTimeSlot! : String
  displayDate = new Date()

  firstFormGroup = this._formBuilder.group({
    treatmentCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    timeSlotCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    firstNameCtrl: ['', Validators.required],
    lastNameCtrl: ['', Validators.required],
    emailCtrl: ['', Validators.required],
    phoneNumberCtrl: ['', Validators.required],
    addressCtrl: [''],
    notesCtrl: [''],
  });
  constructor(
    private bookingService: BookingService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
  }

  ngOnInit(){
    this.tomorrow.setDate(this.tomorrow.getDate() + 1)
    this.fetchTreatments()
  }

  calculateTotalAmount():number{
    return this.bookingTreatments.reduce((previousValue, currentValue)=> {return previousValue + currentValue.price}, 0)
  }
  fetchTreatments(){
    this.bookingService.getCategorisedTreatments(this.tenant.id)
      .subscribe(treatments => this.treatmentCategories = treatments)
  }

  fetchTimeSlots(date:Date){

    this.booking.duration = this.bookingTreatments.reduce((previousValue, currentValue) =>
    { return previousValue + currentValue.minimumDuration }, 0)


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
    this.booking.treatments = this.bookingTreatments
    this.bookingService.bookOnline(this.booking)
      .subscribe(booking=>{
        this._snackBar.open("Booking successfully submitted", "Ok")
        this._router.navigate(['booking-success'])
      })
  }

  protected readonly Utils = Utils;
}
