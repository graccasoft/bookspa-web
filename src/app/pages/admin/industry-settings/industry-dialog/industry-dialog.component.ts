import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IndustryService} from "../../../../service/industry.service";
import {Industry} from "../../../../model/industry";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-industry-dialog',
  templateUrl: './industry-dialog.component.html',
  styleUrls: ['./industry-dialog.component.css']
})
export class IndustryDialogComponent {
  industry!: Industry
  industryForm: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { industry: Industry },
    private industryService: IndustryService,
    private dialogRef: MatDialogRef<IndustryDialogComponent>,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.industry = data.industry
    this.industryForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if( this.industry ){
      this.industryForm.patchValue({
        id: this.industry.id,
        name: this.industry.name
      })
    }
  }

  saveIndustry() {

    const request$ = this.industry && this.industry.id ? this.industryService.updateIndustry(this.industry.id, this.industryForm.value) : this.industryService.saveIndustry(this.industryForm.value)

    request$.subscribe((treatment) => {
      this._snackBar.open("Industry has been saved", "Ok")
      this.dialogRef.close();
    })
  }
}
