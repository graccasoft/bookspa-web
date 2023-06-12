import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReserveComponent} from "./pages/reserve/reserve.component";
import {ReservationsComponent} from "./pages/reservations/reservations.component";
import {TreatmentsComponent} from "./pages/treatments/treatments.component";
import {CustomersComponent} from "./pages/customers/customers.component";
import {ReservePublicComponent} from "./pages/reserve-public/reserve-public.component";
import {
  ReservePublicConfirmationComponent
} from "./pages/reserve-public-confirmation/reserve-public-confirmation.component";

const routes: Routes = [
  {path:'reserve', component:ReserveComponent},
  {path:'reservations', component:ReservationsComponent},
  {path:'treatments', component:TreatmentsComponent},
  {path:'customers', component:CustomersComponent},
  {path:'online-booking', component:ReservePublicComponent},
  {path:'booking-success', component:ReservePublicConfirmationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
