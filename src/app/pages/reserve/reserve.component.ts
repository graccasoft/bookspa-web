import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipListboxChange } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Booking } from 'src/app/model/booking';
import { CategorisedTreatments } from 'src/app/model/categorised-treatments';
import { Client } from 'src/app/model/client';
import { Employee } from 'src/app/model/employee';
import { Tenant } from 'src/app/model/tenant';
import { Treatment } from 'src/app/model/treatment';
import { User } from 'src/app/model/user';
import { AccountsService } from 'src/app/service/accounts.service';
import { BookingService } from 'src/app/service/booking.service';
import { EmployeesService } from 'src/app/service/employees.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent {
  tenant!: Tenant | undefined
  treatmentCategories: CategorisedTreatments[] = []
  filteredCategories: CategorisedTreatments[] = []
  bookingTreatments: Treatment[] = []  //= new Treatment(0,'','',0,0,0,this.tenant)
  employee: Employee = new Employee(0,'','','',false, <Tenant>this.tenant)
  client: Client = new Client(0,'','','','','','','',<Tenant>this.tenant)
  booking: Booking = new Booking(0,new Date(), new Date(),0,'NEW', this.client,this.bookingTreatments,'')
  tomorrow = new Date()
  availableTimeSlots: String[] = []
  selectedTimeSlot!: String
  employees: Employee[] = []
  displayDate = new Date()
  isLoading = false
  timeSelected = false

  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private accountsService: AccountsService,
    private bookingService: BookingService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    const user = this.accountsService.userValue as User;
    this.tenant = user.tenant

    // @ts-ignore
    this.fetchTreatments()
    this.fetchEmployees()

    this.tomorrow.setDate(this.tomorrow.getDate() + 1)

  }

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

  //todo: DRY

  calculateTotalAmount(): number {
    return this.bookingTreatments.reduce((previousValue, currentValue) => { return previousValue + currentValue.price }, 0)
  }
  fetchEmployees() {
    // @ts-ignore
    this.bookingService.getEmployees(this.tenant.id).subscribe(employees => this.employees = employees)
  }
  fetchTreatments() {
    // @ts-ignore
    this.bookingService.getCategorisedTreatments(this.tenant.id)
      .subscribe(treatments => {
        this.treatmentCategories = treatments
        this.searchTreatments("")
      })
  }


  fetchTimeSlots() {
    this.booking.employee = this.employee
    console.log(this.booking)
    const date = this.booking.bookingDate
    this.booking.duration = this.bookingTreatments.reduce((previousValue, currentValue) => { return previousValue + currentValue.minimumDuration }, 0)
    // @ts-ignore

    this.bookingService.getFreeTimeSlots(this.tenant.id, this.booking.employee.id, date, this.booking.duration)
      .subscribe(timeSlots => {
        this.availableTimeSlots = []
        timeSlots.map((timeSlot) => {
          this.availableTimeSlots.push(Utils.dateToTimeSlot(timeSlot.startTime))
        })
      })

  }
  timeSlotSelected(timeSlot: MatChipListboxChange) {
    if (timeSlot.value != undefined) {
      const timeParts = timeSlot.value.split(":")
      let tmpDate = this.booking.bookingDate
      tmpDate.setHours(parseInt(timeParts[0]))
      tmpDate.setMinutes(parseInt(timeParts[1]))

      this.displayDate = tmpDate
      this.booking.bookingDate = tmpDate
      console.log(this.booking.bookingDate)
      this.timeSelected = true
    }
  }

  saveBooking() {
    this.isLoading = true
    this.booking.treatments = this.bookingTreatments
    this.bookingService.bookOnline(this.booking)
      .subscribe(booking => {
        this._snackBar.open("Booking successfully submitted", "Ok")
        this.isLoading = false
        this.router.navigate(['/reservations'], { });
      })
  }


  searchTreatmentsKeyup(event: any) {
    let filter = event.target.value;
    this.searchTreatments(filter)
  }
  searchTreatments(filter: string) {

    let tmpFilter: CategorisedTreatments[] = []
    let treatments: Treatment[] = []
    let tmpAll = JSON.parse(JSON.stringify(this.treatmentCategories))
    tmpAll.map((treatment: CategorisedTreatments) => {
      if (filter == "") {
        treatments = treatment.treatments
      } else {
        treatments = treatment.treatments.filter(t => { return t.name.toLowerCase().includes(filter) })
      }
      if (treatments.length > 0) {
        let categoryToAdd = treatment;
        treatment.treatments = treatments
        tmpFilter.push(categoryToAdd)
      }
    })
    console.log(this.treatmentCategories)

    this.filteredCategories = tmpFilter;
  }
  protected readonly Utils = Utils;
}
