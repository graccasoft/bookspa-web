import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ClientsService } from "../../service/clients.service";
import { AccountsService } from "../../service/accounts.service";
import { Tenant } from "../../model/tenant";
import { Client } from "../../model/client";
import { User } from "../../model/user";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { DownloadFileService } from 'src/app/service/download-file.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  tenant!: Tenant | undefined
  clients: Client[] = []
  client!: Client
  constructor(
    public dialog: MatDialog,
    private clientsService: ClientsService,
    private accountsService: AccountsService,
    private downloadService: DownloadFileService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const user = this.accountsService.userValue as User;
    if (user) {
      this.tenant = user.tenant
      this.fetchCustomers()
    }

  }

  fetchCustomers() {
    // @ts-ignore
    this.clientsService.get(this.tenant.id)
      .subscribe(clients => this.clients = clients)
  }
  addNew() {
    this.client = new Client(0, '', '', '', '', '', '', '', <Tenant>this.tenant);
    this.openDialog()
  }
  edit(id: number) {
    this.client = this.clients.filter(t => t.id === id)[0]
    this.openDialog()
  }
  openDialog() {
    const dialogRef = this.dialog.open(CustomersFormDialog, { width: "50%", data: { tenant: this.tenant, client: this.client } });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchCustomers()
    });
  }
  downloadCsv() {    
    const downloadUrl = `${this.clientsService.apiUrl}/clients-csv?tenantId=${this.tenant?.id}`
    this.downloadService
      .download(downloadUrl)
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'clients.csv';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }

  delete(id: number) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Customers',
        text: 'Are you sure you want to delete this customer?',
        cancelText: 'No',
        confirmText: 'Yes'
      }
    });

    dialog.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.clientsService.delete(id)
          .subscribe(response => { this.fetchCustomers() })
          this._snackBar.open( 'Customer has been deleted.', "Ok")
      }
    })

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
    @Inject(MAT_DIALOG_DATA) data: { tenant: Tenant, client: Client },
    private clientsService: ClientsService,
    private dialogRef: MatDialogRef<CustomersFormDialog>,
    private _snackBar: MatSnackBar
  ) {

    this.client = data.client
  }
  saveCustomer() {

    this.clientsService.save(this.client).subscribe((client) => {
      this._snackBar.open("Customer has been saved", "Ok")
      this.dialogRef.close();
    })
  }


}
