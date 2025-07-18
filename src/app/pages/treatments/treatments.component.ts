import {Component, Inject, ViewChild} from '@angular/core';
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
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute } from '@angular/router';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.css']
})
export class TreatmentsComponent {
  protected readonly Utils = Utils;
  treatments: Treatment[] = []
  filteredTreatments = new MatTableDataSource<Treatment>([]);
  tenant!: Tenant | undefined
  treatment: Treatment = new Treatment(0,'','',0,0,0, <Tenant>this.tenant)
  isPromotions = false
  displayedColumns = ['name', 'price', 'duration', 'category', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.filteredTreatments.paginator = this.paginator;
  }

  constructor(
    public dialog: MatDialog,
    private treatmentService: TreatmentService,
    private accountsService: AccountsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(){
    const user = this.accountsService.userValue as User
    this.tenant = user.tenant
    this.activatedRoute.params.subscribe(s => {
      if(s["isPromotion"] == "promotion"){
        this.isPromotions = true
      }
      this.fetchTreatments()
    });

  }

  fetchTreatments(){
    if(!this.tenant) return;
    if(!this.isPromotions){
      this.treatmentService.get(this.tenant.id).subscribe((treatments)=>{
        this.treatments = treatments
        this.filteredTreatments.data = treatments;
      })
    }else{
      this.treatmentService.getPromotions(this.tenant.id).subscribe((treatments)=>{
        this.treatments = treatments
        this.filteredTreatments.data = treatments;
      })
    }

  }

  selectTreatment (id:number){
    this.treatment = this.treatments.filter(t=>  t.id === id)[0]
  }

  deleteTreatment(id:number){
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.isPromotions ? 'Promotions' : 'Treatments',
        text: 'Are you sure you want to delete this record?',
        cancelText: 'No',
        confirmText: 'Yes'
      }
    });

    dialog.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.treatmentService.delete(id).subscribe(()=>{
          this.fetchTreatments();
        })
      }
    })

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
    const dialogRef = this.dialog.open(TreatmentsFormDialog,{width:"50%",data:{treatment: this.treatment,isPromotions:this.isPromotions}});

    dialogRef.afterClosed().subscribe(result => {
      this.fetchTreatments()
    });
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.trim() === '') {
      this.filteredTreatments.data = this.treatments;
      return;
    }
    this.filteredTreatments.data = this.treatments.filter(u => {
      u.name?.toLowerCase().includes(filterValue.toLowerCase()) ||
      u.category?.name?.toLowerCase().includes(filterValue.toLowerCase());
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
  isPromotions = false
  title = 'Treatment'

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { treatment: Treatment, isPromotions:boolean },
    private treatmentService: TreatmentService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<TreatmentsFormDialog>,
    private _snackBar: MatSnackBar) {
    this.treatment = data.treatment
    this.isPromotions = data.isPromotions
    this.title = this.isPromotions ? 'Promotion' : 'Treatment'
  }

  ngOnInit(){
    this.categoryService.get().subscribe(
      categories=> this.categories = categories
    )

  }

  saveTreatment() {
    this.treatment.isPromotion = this.isPromotions
    this.treatmentService.save( this.treatment ).subscribe((treatment)=>{
      this._snackBar.open( this.isPromotions ? 'Promotion has been saved' : 'Treatment has been saved', "Ok")
      this.dialogRef.close();
    })
  }
}
