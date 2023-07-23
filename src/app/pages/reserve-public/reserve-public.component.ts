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
import {ActivatedRoute, Router} from "@angular/router";
import { CategorisedTreatments } from 'src/app/model/categorised-treatments';
import {Employee} from "../../model/employee";

@Component({
  selector: 'app-reserve-public',
  templateUrl: './reserve-public.component.html',
  styleUrls: ['./reserve-public.component.css']
})
export class ReservePublicComponent {

  tenant!: Tenant
  treatmentCategories: CategorisedTreatments[] = []
  filteredCategories: CategorisedTreatments[] = []
  bookingTreatments: Treatment[] = []  //= new Treatment(0,'','',0,0,0,this.tenant)
  client: Client = new Client(0,'','','','','','','',this.tenant)
  booking: Booking = new Booking(0,new Date(), new Date(),0,'NEW', this.client,this.bookingTreatments,'')
  tomorrow = new Date()
  availableTimeSlots: String[] = []
  selectedTimeSlot! : String
  employees: Employee[] = []
  displayDate = new Date()
  isLoading = false

  firstFormGroup = this._formBuilder.group({
    treatmentCtrl: ['', Validators.required],
    therapistCtrl: ['', Validators.required],
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
    private _router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(){

    this.activatedRoute.params.subscribe(s => {
      this.bookingService.getTenant(s["reference"]).subscribe(
        tenant=>{
          this.tenant = tenant
          this.fetchTreatments()
          this.fetchEmployees()
        }
      )
    });



  }

  calculateTotalAmount():number{
    return this.bookingTreatments.reduce((previousValue, currentValue)=> {return previousValue + currentValue.price}, 0)
  }
  fetchEmployees(){
    this.bookingService.getEmployees(this.tenant.id).subscribe( employees => this.employees = employees )
  }
  fetchTreatments(){
    this.bookingService.getCategorisedTreatments(this.tenant.id)
      .subscribe(treatments => {
        this.treatmentCategories = treatments
        this.searchTreatments("")
      })
  }


  fetchTimeSlots(date:Date){

    this.booking.duration = this.bookingTreatments.reduce((previousValue, currentValue) =>
    { return previousValue + currentValue.minimumDuration }, 0)


    this.bookingService.getFreeTimeSlots(this.tenant.id, this.booking.employee.id, date, this.booking.duration)
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
    this.isLoading = true
    this.booking.treatments = this.bookingTreatments
    this.bookingService.bookOnline(this.booking)
      .subscribe(booking=>{
        this._snackBar.open("Booking successfully submitted", "Ok")
        this._router.navigate(['booking-success'])
        this.isLoading = false
      })
  }


  searchTreatmentsKeyup(event: any){
    let filter = event.target.value;
    this.searchTreatments(filter)
  }
  searchTreatments(filter: string) {
    
    let tmpFilter: CategorisedTreatments[] = []
    let treatments: Treatment[] = []
    let tmpAll = JSON.parse(JSON.stringify( this.treatmentCategories ))
    tmpAll.map((treatment: CategorisedTreatments)=>{
      if( filter == ""){
        treatments = treatment.treatments
      }else{
        treatments = treatment.treatments.filter( t => {return t.name.toLowerCase().includes(filter)} )
      }
      if( treatments.length > 0 ){
        let categoryToAdd = treatment;
        treatment.treatments = treatments
        tmpFilter.push( categoryToAdd ) 
      }
    })
    console.log(this.treatmentCategories)

    this.filteredCategories =  tmpFilter;
  }
  protected readonly Utils = Utils;
}
