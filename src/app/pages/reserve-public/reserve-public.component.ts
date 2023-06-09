import { Component } from '@angular/core';
import {TreatmentService} from "../../service/treatment.service";
import {Tenant} from "../../model/tenant";
import {Treatment} from "../../model/treatment";
import {Client} from "../../model/client";
import {Booking} from "../../model/booking";

@Component({
  selector: 'app-reserve-public',
  templateUrl: './reserve-public.component.html',
  styleUrls: ['./reserve-public.component.css']
})
export class ReservePublicComponent {

  tenant: Tenant = new Tenant(1)
  treatments: Treatment[] = []
  treatment!: Treatment
  client: Client = new Client(0,'','','','','','',this.tenant)
  booking: Booking = new Booking(0,new Date(), new Date(),0,'NEW', this.client,this.treatment)
  constructor(private treatmentService: TreatmentService) {
  }

  ngOnInit(){
    this.fetchTreatments()
  }
  fetchTreatments(){
    this.treatmentService.get(this.tenant.id)
      .subscribe(treatments => this.treatments = treatments)
  }
}
