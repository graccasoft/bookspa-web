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
import {LoginComponent} from "./pages/login/login.component";
import {EmployeesComponent} from "./pages/employees/employees.component";

const routes: Routes = [
  {path:'reserve', component:ReserveComponent},
  {path:'reservations', component:ReservationsComponent, title:'BlackKokia - Reservations'},
  {path:'treatments', component:TreatmentsComponent, title:'BlackKokia - Treatments'},
  {path:'customers', component:CustomersComponent, title:'BlackKokia - Customers'},
  {path:'employees', component:EmployeesComponent, title:'BlackKokia - Employees'},
  {path:'online-booking', component:ReservePublicComponent, title:'Online Booking - BlackKokia'},
  {path:'booking-success', component:ReservePublicConfirmationComponent, title:'Online Booking - BlackKokia'},
  {path:'login', component:LoginComponent, title:'Client Login - BlackKokia'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
