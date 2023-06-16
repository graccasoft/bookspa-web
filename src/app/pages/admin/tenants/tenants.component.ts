import {Component, Inject} from '@angular/core';
import {Tenant} from "../../../model/tenant";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TenantsService} from "../../../service/tenants.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent {

  tenant: Tenant = new Tenant(0,'','','','','','','','','')
  tenants: Tenant[] = []

  constructor(
    public dialog: MatDialog,
    private tenantsService: TenantsService
  ) {}

  ngOnInit(){
    this.fetchTenants()
  }

  fetchTenants(){
    this.tenantsService.get()
      .subscribe(tenants=> this.tenants = tenants)
  }

  newTenant(){
    this.tenant = new Tenant(0,'','','','','','','','','')
    this.openDialog()
  }

  selectTenant (id:number){
    this.tenant = this.tenants.filter(t=>  t.id === id)[0]
  }
  editTenant(id:number){
    this.selectTenant(id)
    this.openDialog()
  }
  openDialog() {
    const dialogRef = this.dialog.open(TenantsFormDialog,{width:"50%",data:{tenant: this.tenant}});

    dialogRef.afterClosed().subscribe(result => {
      this.fetchTenants()
    });
  }
}

@Component({
  selector: 'tenants-form-dialog',
  templateUrl: 'tenants-form-dialog.html',
})
export class TenantsFormDialog {

  tenant!: Tenant
  constructor(
    @Inject(MAT_DIALOG_DATA) data: { tenant: Tenant },
    private tenantsService: TenantsService,
    private dialogRef: MatDialogRef<TenantsFormDialog>,
    private _snackBar: MatSnackBar) {
    this.tenant = data.tenant
  }
  saveTenant() {
    this.tenantsService.save( this.tenant ).subscribe((treatment)=>{
      this._snackBar.open("Tenant has been saved", "Ok")
      this.dialogRef.close();
    })
  }
}
