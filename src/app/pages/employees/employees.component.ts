import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Employee} from "../../model/employee";
import {EmployeesService} from "../../service/employees.service";
import {Tenant} from "../../model/tenant";
import {AccountsService} from "../../service/accounts.service";
import {User} from "../../model/user";
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { DownloadFileService } from 'src/app/service/download-file.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  employees: Employee[] = []

  tenant!: Tenant | undefined

  employee: Employee = new Employee(0,'','','',false, <Tenant>this.tenant)
  constructor(
    public dialog: MatDialog,
    private treatmentService: EmployeesService,
    private accountsService: AccountsService,
    private employeesService: EmployeesService,
    private _snackBar: MatSnackBar,
    private downloadService: DownloadFileService
  ) {}

  ngOnInit(){
    const user = this.accountsService.userValue as User;
    this.tenant = user.tenant
    this.fetchEmployees()
  }

  fetchEmployees(){
    // @ts-ignore
    this.treatmentService.get(this.tenant.id).subscribe((employees)=>{
      this.employees = employees
    })
  }

  selectEmployee (id:number){
    this.employee = this.employees.filter(t=>  t.id === id)[0]
  }

  toggleAvailability(id:number){
    this.selectEmployee(id)
    this.employee.isAvailable = !this.employee.isAvailable
    this.employeesService.toggleAvailability( this.employee ).subscribe(()=>{
      this._snackBar.open("Employee has been updated", "Ok")
      this.fetchEmployees()
    })
  }
  newEmployee(){
    this.employee = new Employee(0,'','','',false, <Tenant>this.tenant)
    this.openDialog()
  }
  editEmployee(id:number){
    this.selectEmployee(id)
    this.openDialog()
  }
  openDialog() {
    const dialogRef = this.dialog.open(EmployeesFormDialog,{width:"50%",data:{employee: this.employee}});

    dialogRef.afterClosed().subscribe(result => {
      this.fetchEmployees()
    });
  }

  downloadCsv() {    
    const downloadUrl = `${this.employeesService.apiUrl}/employees-csv?tenantId=${this.tenant?.id}`
    this.downloadService
      .download(downloadUrl)
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'employees.csv';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }
  
  delete(id: number) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Employees',
        text: 'Are you sure you want to delete this employee?',
        cancelText: 'No',
        confirmText: 'Yes'
      }
    });

    dialog.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.employeesService.delete(id)
          .subscribe(response => { this.fetchEmployees() })
      }
    })

  }

}

@Component({
  selector: 'employees-form-dialog',
  templateUrl: 'employees-form-dialog.html',
})
export class EmployeesFormDialog {

  employee!: Employee
  constructor(
    @Inject(MAT_DIALOG_DATA) data: { employee: Employee },
    private employeesService: EmployeesService,
    private dialogRef: MatDialogRef<EmployeesFormDialog>,
    private _snackBar: MatSnackBar) {
    this.employee = data.employee
  }
  saveEmployee() {
    this.employeesService.save( this.employee ).subscribe((treatment)=>{
      this._snackBar.open("Employee has been saved", "Ok")
      this.dialogRef.close();
    })
  }
}

