import {Component, Input} from '@angular/core';
import {AccountsService} from "../service/accounts.service";
import {Tenant} from "../model/tenant";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  tenant!: Tenant
  @Input() activeMenu = "reserve"

  constructor(
    private accountsService: AccountsService
  ) {
  }

  ngOnInit(){
    const user = this.accountsService.userValue
    if( user && user.tenant ){
      this.tenant = user.tenant
    }
  }

  logout(){
    this.accountsService.logout()
  }
}
