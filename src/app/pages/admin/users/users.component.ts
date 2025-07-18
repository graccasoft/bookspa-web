import {Component, Inject, ViewChild, AfterViewInit} from '@angular/core';
import {Tenant} from "../../../model/tenant";
import {TenantsService} from "../../../service/tenants.service";
import {User} from "../../../model/user";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogComponent} from 'src/app/confirm-dialog/confirm-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {

  tenant!: Tenant
  user: User = new User()
  users = new MatTableDataSource<User>([]);
  filteredUsers = new MatTableDataSource<User>([]);
  displayedColumns = ['id', 'name', 'username', 'role', 'actions']

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.filteredUsers.paginator = this.paginator;
  }

  constructor(
    private tenantsService: TenantsService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(s => {
      this.tenantsService.getTenant(s["tenantId"])
        .subscribe(tenant => {
          this.tenant = tenant;
          this.fetchUsers()
        })
    });
  }

  fetchUsers() {
    this.tenantsService.getUsers(this.tenant.id)
      .subscribe(users => {
        this.users.data = users
        this.filteredUsers.data = users;
      })
  }

  newUser() {
    this.user = new User()
    this.openDialog()
  }

  selectUser(id: number) {
    this.user = this.users.data.filter(u => u.id === id)[0]
  }

  editUser(id: number | undefined) {
    this.selectUser(id as number)
    this.user.password = ""
    this.openDialog()
  }

  openDialog() {
    const dialogRef = this.dialog.open(UsersFormDialog, {width: "50%", data: {user: this.user, tenant: this.tenant}});

    dialogRef.afterClosed().subscribe(result => {
      this.fetchUsers()
    });
  }

  delete(id: number | undefined) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Users',
        text: 'Are you sure you want to update this user?',
        cancelText: 'No',
        confirmText: 'Yes'
      }
    });

    dialog.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.tenantsService.deleteUser(id as number, this.tenant.id)
          .subscribe(response => {
            this.fetchUsers()
          })
      }
    })

  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.trim() === '') {
      this.filteredUsers.data = this.users.data;
      return;
    }
    this.filteredUsers.data = this.users.data.filter(u => u.lastName?.toLowerCase().includes(filterValue.toLowerCase()));
  }
}

@Component({
  selector: 'users-form-dialog',
  templateUrl: 'users-form-dialog.html',
})
export class UsersFormDialog {

  user!: User
  tenant!: Tenant

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { user: User, tenant: Tenant },
    private tenantsService: TenantsService,
    private dialogRef: MatDialogRef<UsersFormDialog>,
    private _snackBar: MatSnackBar) {
    this.user = data.user
    this.tenant = data.tenant
  }

  saveUser() {
    this.user.tenant = this.tenant
    this.tenantsService.saveUser(this.user, this.tenant.id).subscribe((res) => {
      this._snackBar.open("User has been saved", "Ok")
      this.dialogRef.close();
    })
  }
}
