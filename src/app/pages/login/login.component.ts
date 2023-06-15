import { Component } from '@angular/core';
import {AccountsService} from "../../service/accounts.service";
import {first} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    private _snackBar: MatSnackBar
  ) {
  }

  doLogin(){
    this.accountsService.login(this.username, this.password)
      .pipe(first())
      .subscribe({
        next: () => {
          this._snackBar.open("Logged in successfully", "Ok")
        },
        error: error => {
          this._snackBar.open("Log in failed", "Ok")
        }
      });
  }
}
