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

  tawkScriptElement: HTMLScriptElement;


  constructor(
    private accountsService: AccountsService
  ) {
    this.tawkScriptElement = document.createElement("script");
    this.tawkScriptElement.src = "https://embed.tawk.to/6480447194cf5d49dc5c47d6/1h2agmong";
    this.tawkScriptElement.crossOrigin = "*"
    this.tawkScriptElement.async = true
    this.tawkScriptElement.charset = "UTF-8"
    document.body.appendChild(this.tawkScriptElement);
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
