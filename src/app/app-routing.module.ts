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

const routes: Routes = [
  //tenant
  {path:'reserve', component:ReserveComponent, title:'BlackKokia - Quick Reservation', canActivate: [AuthGuard]},
  {path:'reservations', component:ReservationsComponent, title:'BlackKokia - Reservations', canActivate: [AuthGuard]},
  {path:'treatments', component:TreatmentsComponent, title:'BlackKokia - Treatments', canActivate: [AuthGuard]},
  {path:'customers', component:CustomersComponent, title:'BlackKokia - Customers', canActivate: [AuthGuard]},
  {path:'employees', component:EmployeesComponent, title:'BlackKokia - Employees', canActivate: [AuthGuard]},
  {path:'settings', component:TenantSettingsComponent, title:'BlackKokia - Spa Settings', canActivate: [AuthGuard]},

  //super admin
  {path:'tenants', component:TenantsComponent, title:'BlackKokia - Tenants', canActivate: [SuperAuthGuard]},
  {path:'users/:tenantId', component:UsersComponent, title:'BlackKokia - Tenant Users', canActivate: [SuperAuthGuard]},

  //public
  {path:'online-booking/:reference', component:ReservePublicComponent, title:'Online Booking - BlackKokia'},
  {path:'booking-success', component:ReservePublicConfirmationComponent, title:'Online Booking - BlackKokia'},
  {path:'login', component:LoginComponent, title:'Client Login - BlackKokia'},
  {path:'**', component:LoginComponent, title:'Client Login - BlackKokia'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
