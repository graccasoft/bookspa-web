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
import { ReportComponent } from './pages/report/report.component';
import {IndustrySettingsComponent} from "./pages/admin/industry-settings/industry-settings.component";

const routes: Routes = [
  //tenant
  {path:'reserve', component:ReserveComponent, title:'NextPerch - Quick Reservation', canActivate: [AuthGuard]},
  {path:'reservations', component:ReservationsComponent, title:'NextPerch - Reservations', canActivate: [AuthGuard]},
  {path:'treatments', component:TreatmentsComponent, title:'NextPerch - Treatments', canActivate: [AuthGuard]},
  {path:'treatments/:isPromotion', component:TreatmentsComponent, title:'NextPerch - Treatments', canActivate: [AuthGuard]},
  {path:'customers', component:CustomersComponent, title:'NextPerch - Customers', canActivate: [AuthGuard]},
  {path:'employees', component:EmployeesComponent, title:'NextPerch - Employees', canActivate: [AuthGuard]},
  {path:'settings', component:TenantSettingsComponent, title:'NextPerch - Spa Settings', canActivate: [AuthGuard]},
  {path:'report', component:ReportComponent, title:'NextPerch - Report', canActivate: [AuthGuard]},

  //super admin
  {path:'tenants', component:TenantsComponent, title:'NextPerch - Tenants', canActivate: [SuperAuthGuard]},
  {path:'users/:tenantId', component:UsersComponent, title:'NextPerch - Tenant Users', canActivate: [SuperAuthGuard]},
  {path:'industry-settings', component:IndustrySettingsComponent, title:'NextPerch - Industry Settings', canActivate: [SuperAuthGuard]},

  //public
  {path:'online-booking/:reference', component:ReservePublicComponent, title:'Online Booking - NextPerch'},
  {path:'booking-success', component:ReservePublicConfirmationComponent, title:'Online Booking - NextPerch'},
  {path:'booking/:reference', component:BookingDetailsComponent, title:'My Booking - NextPerch'},
  {path:'login', component:LoginComponent, title:'Client Login - NextPerch'},
  {path:'**', component:LoginComponent, title:'Client Login - NextPerch'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
