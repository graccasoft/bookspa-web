import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ClientsService} from "../../service/clients.service";
import {AccountsService} from "../../service/accounts.service";
import {Tenant} from "../../model/tenant";
import {Client} from "../../model/client";
import {User} from "../../model/user";

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
