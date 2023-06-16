import { Component } from '@angular/core';
import {Tenant} from "../../model/tenant";
import {AccountsService} from "../../service/accounts.service";
import {TenantsService} from "../../service/tenants.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-tenant-settings',
  templateUrl: './tenant-settings.component.html',
  styleUrls: ['./tenant-settings.component.css']
})
export class TenantSettingsComponent {

  tenant!: Tenant

  constructor(
    private accountsService: AccountsService,
    private tenantsService: TenantsService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(){
    const user = this.accountsService.userValue
    if( user && user.tenant ){

      this.tenantsService.getTenant(user.tenant.id)
        .subscribe(tenant => this.tenant = tenant)

    }
  }

  saveTenant() {
    this.tenantsService.save( this.tenant ).subscribe((treatment)=>{
      this._snackBar.open("Settings have been saved", "Ok")
    })
  }
}
