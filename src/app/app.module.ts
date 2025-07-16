import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { ReserveComponent } from './pages/reserve/reserve.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatLineModule} from "@angular/material/core";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {MatChipsModule} from "@angular/material/chips";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import { ReservationsComponent,ReservationPaymentFormDialog } from './pages/reservations/reservations.component';
import {MatMenuModule} from "@angular/material/menu";
import { TreatmentsComponent } from './pages/treatments/treatments.component';
import { TreatmentsFormDialog } from "./pages/treatments/treatments.component";
import { EmployeesFormDialog } from "./pages/employees/employees.component";
import {MatDialogModule} from "@angular/material/dialog";
import { CustomersComponent } from './pages/customers/customers.component';
import {CustomersFormDialog} from "./pages/customers/customers.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ReservePublicComponent } from './pages/reserve-public/reserve-public.component';
import {MatStepperModule} from "@angular/material/stepper";
import { ReservePublicConfirmationComponent } from './pages/reserve-public-confirmation/reserve-public-confirmation.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LoginComponent } from './pages/login/login.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import {JwtInterceptor} from "./helpers/jwt.interceptor";
import {ErrorInterceptor} from "./helpers/error.interceptor";
import { TenantsComponent } from './pages/admin/tenants/tenants.component';
import {TenantsFormDialog} from "./pages/admin/tenants/tenants.component";
import { UsersComponent } from './pages/admin/users/users.component';
import {UsersFormDialog} from "./pages/admin/users/users.component";
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { TenantSettingsComponent } from './pages/tenant-settings/tenant-settings.component';
import { BookingDetailsComponent } from './pages/booking-details/booking-details.component';
import { ReportComponent } from './pages/report/report.component';
import { IndustrySettingsComponent } from './pages/admin/industry-settings/industry-settings.component';
import { CategoryDialogComponent } from './pages/admin/industry-settings/category-dialog/category-dialog.component';
import { IndustryDialogComponent } from './pages/admin/industry-settings/industry-dialog/industry-dialog.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ReserveComponent,
    ReservationsComponent,
    ReservationPaymentFormDialog,
    TreatmentsComponent,
    TreatmentsFormDialog,
    CustomersComponent,
    CustomersFormDialog,
    ReservePublicComponent,
    ReservePublicConfirmationComponent,
    ConfirmDialogComponent,
    LoginComponent,
    EmployeesComponent,
    EmployeesFormDialog,
    TenantsComponent,
    TenantsFormDialog,
    UsersComponent,
    UsersFormDialog,
    AdminLayoutComponent,
    TenantSettingsComponent,
    BookingDetailsComponent,
    ReportComponent,
    IndustrySettingsComponent,
    CategoryDialogComponent,
    IndustryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatLineModule,
    MatGridListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
