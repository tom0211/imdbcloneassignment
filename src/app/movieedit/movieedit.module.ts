import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieeditRoutingModule } from './movieedit-routing.module';
import { MovieeditComponent } from './movieedit.component';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  declarations: [
    MovieeditComponent
  ],
  imports: [
    CommonModule,
    MovieeditRoutingModule,
    NavbarModule
  ]
})
export class MovieeditModule { }
