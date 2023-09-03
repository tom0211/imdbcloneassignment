import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviedetailsRoutingModule } from './moviedetails-routing.module';
import { MoviedetailsComponent } from './moviedetails.component';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  declarations: [
    MoviedetailsComponent
  ],
  imports: [
    CommonModule,
    MoviedetailsRoutingModule,
    NavbarModule
  ]
})
export class MoviedetailsModule { }
