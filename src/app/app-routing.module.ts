import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReserveComponent} from "./reserve/reserve.component";
import {ReservationsComponent} from "./reservations/reservations.component";
import {TreatmentsComponent} from "./treatments/treatments.component";
import {CustomersComponent} from "./customers/customers.component";

const routes: Routes = [
  {path:'reserve', component:ReserveComponent},
  {path:'reservations', component:ReservationsComponent},
  {path:'treatments', component:TreatmentsComponent},
  {path:'customers', component:CustomersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
