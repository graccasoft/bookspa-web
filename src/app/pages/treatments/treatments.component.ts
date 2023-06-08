import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TreatmentService} from "../../service/treatment.service";
import {Treatment} from "../../model/treatment";
import {Tenant} from "../../model/tenant";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.css']
})
export class TreatmentsComponent {

  treatments: Treatment[] = []
  tenant: Tenant = new Tenant(1)
  treatment: Treatment = new Treatment(0,'','',0,0,0, this.tenant)
  constructor(public dialog: MatDialog, private treatmentService: TreatmentService) {}

  ngOnInit(){
    this.fetchTreatments()
  }

  fetchTreatments(){
    this.treatmentService.get(1).subscribe((treatments)=>{
      this.treatments = treatments
    })
  }

  selectTreatment (id:number){
    this.treatment = this.treatments.filter(t=>  t.id === id)[0]
  }

  newTreatment(){
    this.treatment = new Treatment(0,'','',0,0,0, this.tenant)
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
  constructor(
    @Inject(MAT_DIALOG_DATA) data: { treatment: Treatment },
    private treatmentService: TreatmentService,
    private dialogRef: MatDialogRef<TreatmentsFormDialog>,
    private _snackBar: MatSnackBar) {
    this.treatment = data.treatment
  }
  saveTreatment() {
    this.treatmentService.save( this.treatment ).subscribe((treatment)=>{
      this._snackBar.open("Treatment has been saved", "Ok")
      this.dialogRef.close();
    })
  }
}
