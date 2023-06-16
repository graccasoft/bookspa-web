import { Component } from '@angular/core';
import {AccountsService} from "../../service/accounts.service";
import {first} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = ""
  password = ""

  constructor(
    private accountsService: AccountsService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  doLogin(){
    this.accountsService.login(this.username, this.password)
      .pipe(first())
      .subscribe({
        next: (user) => {
          this._snackBar.open("Logged in successfully", "Ok")
          if( user.role == "SUPER_ADMIN" )
            this.router.navigate(['/tenants'], { });
          else
            this.router.navigate(['/reservations'], { });
        },
        error: error => {
          this._snackBar.open("Log in failed", "Ok")
        }
      });
  }
}
