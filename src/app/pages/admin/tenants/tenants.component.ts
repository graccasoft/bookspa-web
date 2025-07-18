import {Component, Inject, ViewChild} from '@angular/core';
import {Tenant} from "../../../model/tenant";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TenantsService} from "../../../service/tenants.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import {Industry} from "../../../model/industry";
import {IndustryService} from "../../../service/industry.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../model/user";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent {

  tenant: Tenant = new Tenant(0,'','','','','','','','','')
  tenants: Tenant[] = []
  filteredTenants = new MatTableDataSource<Tenant>([]);
  displayedColumns: string[] = [ 'name','industry', 'contact', 'reference', 'status',  'actions']

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.filteredTenants.paginator = this.paginator;
  }

  constructor(
    public dialog: MatDialog,
    private tenantsService: TenantsService
  ) {}

  ngOnInit(){
    this.fetchTenants()
  }

  fetchTenants(){
    this.tenantsService.get()
      .subscribe(tenants=> {
        this.tenants = tenants;
        this.filteredTenants.data = tenants;
      })
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


  delete(id: number) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Tenants',
        text: 'Are you sure you want to delete this tenant?',
        cancelText: 'No',
        confirmText: 'Yes'
      }
    });

    dialog.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.tenantsService.delete(id)
          .subscribe(response => { this.fetchTenants() })
      }
    })

  }

  toggleActive(id: number) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Tenants',
        text: 'Are you sure you want to suspend/unsuspend this tenant?',
        cancelText: 'No',
        confirmText: 'Yes'
      }
    });

    dialog.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.selectTenant(id)
        this.tenantsService.toggleActive(this.tenant)
          .subscribe(response => { this.fetchTenants() })
      }
    })

  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.trim() === '') {
      this.filteredTenants.data = this.tenants;
      return;
    }
    this.filteredTenants.data = this.tenants.filter(t => t.companyName?.toLowerCase().includes(filterValue.toLowerCase()));
  }

}

@Component({
  selector: 'tenants-form-dialog',
  templateUrl: 'tenants-form-dialog.html',
})
export class TenantsFormDialog {

  tenant!: Tenant
  industries: Industry[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) data: { tenant: Tenant },
    private tenantsService: TenantsService,
    private industryService: IndustryService,
    private dialogRef: MatDialogRef<TenantsFormDialog>,
    private _snackBar: MatSnackBar) {
    this.tenant = data.tenant
  }
  ngOnInit(): void {
    this.industryService.getAllIndustries().subscribe(industries => {
      this.industries = industries;
    })
  }
  saveTenant() {
    this.tenantsService.save( this.tenant ).subscribe((treatment)=>{
      this._snackBar.open("Tenant has been saved", "Ok")
      this.dialogRef.close();
    })
  }
}
