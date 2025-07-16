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
  {path:'reserve', component:ReserveComponent, title:'Bookspa - Quick Reservation', canActivate: [AuthGuard]},
  {path:'reservations', component:ReservationsComponent, title:'Bookspa - Reservations', canActivate: [AuthGuard]},
  {path:'treatments', component:TreatmentsComponent, title:'Bookspa - Treatments', canActivate: [AuthGuard]},
  {path:'treatments/:isPromotion', component:TreatmentsComponent, title:'Bookspa - Treatments', canActivate: [AuthGuard]},
  {path:'customers', component:CustomersComponent, title:'Bookspa - Customers', canActivate: [AuthGuard]},
  {path:'employees', component:EmployeesComponent, title:'Bookspa - Employees', canActivate: [AuthGuard]},
  {path:'settings', component:TenantSettingsComponent, title:'Bookspa - Spa Settings', canActivate: [AuthGuard]},
  {path:'report', component:ReportComponent, title:'Bookspa - Report', canActivate: [AuthGuard]},

  //super admin
  {path:'tenants', component:TenantsComponent, title:'Bookspa - Tenants', canActivate: [SuperAuthGuard]},
  {path:'users/:tenantId', component:UsersComponent, title:'Bookspa - Tenant Users', canActivate: [SuperAuthGuard]},
  {path:'industry-settings', component:IndustrySettingsComponent, title:'Bookspa - Industry Settings', canActivate: [SuperAuthGuard]},

  //public
  {path:'online-booking/:reference', component:ReservePublicComponent, title:'Online Booking - Bookspa'},
  {path:'booking-success', component:ReservePublicConfirmationComponent, title:'Online Booking - Bookspa'},
  {path:'booking/:reference', component:BookingDetailsComponent, title:'My Booking - Bookspa'},
  {path:'login', component:LoginComponent, title:'Client Login - Bookspa'},
  {path:'**', component:LoginComponent, title:'Client Login - Bookspa'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
