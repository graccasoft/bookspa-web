import {Component, Input} from '@angular/core';
import {AccountsService} from "../service/accounts.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  @Input() activeMenu = "reserve"

  constructor(
    private accountsService: AccountsService
  ) {
  }

  logout(){
    this.accountsService.logout()
  }
}
