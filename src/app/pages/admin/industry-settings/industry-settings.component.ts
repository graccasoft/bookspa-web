import { Component } from '@angular/core';
import {Industry} from "../../../model/industry";
import {TreatmentCategory} from "../../../model/treatment-category";
import {IndustryService} from "../../../service/industry.service";
import {CategoryService} from "../../../service/category.service";
import {MatDialog} from "@angular/material/dialog";
import {IndustryDialogComponent} from "./industry-dialog/industry-dialog.component";
import {CategoryDialogComponent} from "./category-dialog/category-dialog.component";

@Component({
  selector: 'app-industry-settings',
  templateUrl: './industry-settings.component.html',
  styleUrls: ['./industry-settings.component.css']
})
export class IndustrySettingsComponent {

  industries: Industry[] = []
  industryDisplayedColumns: string[] = ['id','name', 'actions']

  categories: TreatmentCategory[] = []
  categoryDisplayedColumns: string[] = ['id','name', 'industry','actions']

  constructor(
    private industryService: IndustryService,
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.fetchIndustries();
    this.fetchCategories();
  }

  fetchIndustries() {
    this.industryService.getAllIndustries().subscribe({
      next: (industries) => {
        this.industries = industries;
      },
      error: (error) => {
        console.error('Error fetching industries:', error);
      }
    });
  }

  fetchCategories() {
    this.categoryService.get().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
  industryModal(industry?: Industry){
    const dialogRef = this.dialog.open(IndustryDialogComponent,{width:"400px",data:{industry:industry}});

    dialogRef.afterClosed().subscribe(result => {
      this.fetchIndustries();
    });
  }

  categoryModal(category?: TreatmentCategory){
    const dialogRef = this.dialog.open(CategoryDialogComponent,{width:"400px",data:{category:category}});

    dialogRef.afterClosed().subscribe(result => {
      this.fetchCategories();
    });
  }
}
