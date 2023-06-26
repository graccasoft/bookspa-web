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
import {AuthGuard} from "./helpers/auth.guard";
import {TenantsComponent} from "./pages/admin/tenants/tenants.component";
import {SuperAuthGuard} from "./helpers/super-auth.guard";
import {UsersComponent} from "./pages/admin/users/users.component";
import {TenantSettingsComponent} from "./pages/tenant-settings/tenant-settings.component";
import { BookingDetailsComponent } from './pages/booking-details/booking-details.component';

const routes: Routes = [
  //tenant
  {path:'reserve', component:ReserveComponent, title:'RedKokia - Quick Reservation', canActivate: [AuthGuard]},
  {path:'reservations', component:ReservationsComponent, title:'RedKokia - Reservations', canActivate: [AuthGuard]},
  {path:'treatments', component:TreatmentsComponent, title:'RedKokia - Treatments', canActivate: [AuthGuard]},
  {path:'customers', component:CustomersComponent, title:'RedKokia - Customers', canActivate: [AuthGuard]},
  {path:'employees', component:EmployeesComponent, title:'RedKokia - Employees', canActivate: [AuthGuard]},
  {path:'settings', component:TenantSettingsComponent, title:'RedKokia - Spa Settings', canActivate: [AuthGuard]},

  //super admin
  {path:'tenants', component:TenantsComponent, title:'BlackKokia - Tenants', canActivate: [SuperAuthGuard]},
  {path:'users/:tenantId', component:UsersComponent, title:'BlackKokia - Tenant Users', canActivate: [SuperAuthGuard]},

  //public
  {path:'online-booking/:reference', component:ReservePublicComponent, title:'Online Booking - RedKokia'},
  {path:'booking-success', component:ReservePublicConfirmationComponent, title:'Online Booking - RedKokia'},
  {path:'booking/:reference', component:BookingDetailsComponent, title:'My Booking - RedKokia'},
  {path:'login', component:LoginComponent, title:'Client Login - RedKokia'},
  {path:'**', component:LoginComponent, title:'Client Login - RedKokia'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
