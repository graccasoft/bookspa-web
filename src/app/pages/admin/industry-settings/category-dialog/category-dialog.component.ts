import {Component, Inject, OnInit} from '@angular/core';
import {Industry} from "../../../../model/industry";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IndustryService} from "../../../../service/industry.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TreatmentCategory} from "../../../../model/treatment-category";
import {CategoryService} from "../../../../service/category.service";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit{
  category!: TreatmentCategory
  categoryForm: FormGroup
  industries: Industry[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { category: TreatmentCategory },
    private industryService: IndustryService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.category = data.category
    this.categoryForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      industry: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.industryService.getAllIndustries().subscribe(industries => {
      this.industries = industries;

      if (this.category) {
        this.categoryForm.patchValue({
          id: this.category.id,
          name: this.category.name,
          industry: this.category.industry
        })
      }
    })


  }

  saveCategory() {

    const request$ = this.category && this.category.id ? this.categoryService.update(this.category.id, this.categoryForm.value) : this.categoryService.save(this.categoryForm.value)

    request$.subscribe((treatment) => {
      this._snackBar.open("Category has been saved", "Ok")
      this.dialogRef.close();
    })
  }
}
