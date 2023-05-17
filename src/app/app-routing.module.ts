import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReserveComponent} from "./reserve/reserve.component";

const routes: Routes = [
  {path:'reserve', component:ReserveComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
