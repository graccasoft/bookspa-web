import {Component, Input} from '@angular/core';
import {AccountsService} from "../../../service/accounts.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  @Input() activeMenu = "tenants"
  @Input() pageTitle = ""
  @Input() pageSubTitle = ""

  constructor(
    private accountsService: AccountsService
  ) {
  }

  logout(){
    this.accountsService.logout()
  }
}
