import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ClientsService} from "../../service/clients.service";
import {AccountsService} from "../../service/accounts.service";
import {Tenant} from "../../model/tenant";
import {Client} from "../../model/client";
import {User} from "../../model/user";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  tenant!: Tenant | undefined
  clients: Client[] = []
  constructor(
    public dialog: MatDialog,
    private clientsService: ClientsService,
    private accountsService: AccountsService
  ) {}

  ngOnInit(){
    const user = this.accountsService.userValue as User;
    if (user) {
      this.tenant = user.tenant
      this.fetchCustomers()
    }

  }

  fetchCustomers(){
    // @ts-ignore
    this.clientsService.get(this.tenant.id)
      .subscribe(clients => this.clients = clients)
  }
  openDialog() {
    const dialogRef = this.dialog.open(CustomersFormDialog,{width:"50%",data:{tenant: this.tenant}});

    dialogRef.afterClosed().subscribe(result => {
      this.fetchCustomers()
    });
  }
}
@Component({
  selector: 'customers-form-dialog',
  templateUrl: 'customers-form-dialog.html',
})
export class CustomersFormDialog {
  client!: Client

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: { tenant: Tenant },
    private clientsService: ClientsService,
    private dialogRef: MatDialogRef<CustomersFormDialog>,
    private _snackBar: MatSnackBar
  ) {

    this.client = new Client(0,'','','','','','','',<Tenant>data.tenant)
  }
  saveCustomer() {
   
    this.clientsService.save( this.client ).subscribe((client)=>{
      this._snackBar.open("Treatment has been saved", "Ok")
      this.dialogRef.close();
    })
  }
}
