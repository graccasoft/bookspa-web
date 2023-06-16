import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TreatmentService} from "../../service/treatment.service";
import {Treatment} from "../../model/treatment";
import {Tenant} from "../../model/tenant";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TreatmentCategory} from "../../model/treatment-category";
import {CategoryService} from "../../service/category.service";
import { Utils } from 'src/app/utils/utils';
import {AccountsService} from "../../service/accounts.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.css']
})
export class TreatmentsComponent {
  protected readonly Utils = Utils;
  treatments: Treatment[] = []
  tenant!: Tenant | undefined
  treatment: Treatment = new Treatment(0,'','',0,0,0, <Tenant>this.tenant)
  constructor(
    public dialog: MatDialog,
    private treatmentService: TreatmentService,
    private accountsService: AccountsService
  ) {}

  ngOnInit(){
    const user = this.accountsService.userValue as User
    this.tenant = user.tenant
    this.fetchTreatments()
  }

  fetchTreatments(){
    // @ts-ignore
    this.treatmentService.get(this.tenant.id).subscribe((treatments)=>{
      this.treatments = treatments
    })
  }

  selectTreatment (id:number){
    this.treatment = this.treatments.filter(t=>  t.id === id)[0]
  }

  newTreatment(){
    this.treatment = new Treatment(0,'','',0,0,0, <Tenant>this.tenant)
    this.openDialog()
  }
  editTreatment(id:number){
    this.selectTreatment(id)
    this.openDialog()
  }
  openDialog() {
    const dialogRef = this.dialog.open(TreatmentsFormDialog,{width:"50%",data:{treatment: this.treatment}});

    dialogRef.afterClosed().subscribe(result => {
      this.fetchTreatments()
    });
  }

}
@Component({
  selector: 'treatments-form-dialog',
  templateUrl: 'treatments-form-dialog.html',
})

export class TreatmentsFormDialog {

  treatment!: Treatment
  categories: TreatmentCategory[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) data: { treatment: Treatment },
    private treatmentService: TreatmentService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<TreatmentsFormDialog>,
    private _snackBar: MatSnackBar) {
    this.treatment = data.treatment
  }

  ngOnInit(){
    this.categoryService.get().subscribe(
      categories=> this.categories = categories
    )
  }

  saveTreatment() {
    this.treatmentService.save( this.treatment ).subscribe((treatment)=>{
      this._snackBar.open("Treatment has been saved", "Ok")
      this.dialogRef.close();
    })
  }
}
