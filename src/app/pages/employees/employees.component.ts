import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Employee} from "../../model/employee";
import {EmployeesService} from "../../service/employees.service";
import {Tenant} from "../../model/tenant";
import {AccountsService} from "../../service/accounts.service";
import {User} from "../../model/user";

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
    private accountsService: AccountsService
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

  toggleAvailability(id:number){}
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

