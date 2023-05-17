import { Component } from '@angular/core';
import {TreatmentsFormDialog} from "../treatments/treatments.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  constructor(public dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(CustomersFormDialog,{width:"50%"});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
@Component({
  selector: 'customers-form-dialog',
  templateUrl: 'customers-form-dialog.html',
})
export class CustomersFormDialog {}
