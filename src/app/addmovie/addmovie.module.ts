import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddmovieRoutingModule } from './addmovie-routing.module';
import { AddmovieComponent } from './addmovie.component';
import { NavbarModule } from '../navbar/navbar.module';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddmovieComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AddmovieRoutingModule,
    NavbarModule,
    MatSelectModule
  ]
})
export class AddmovieModule { }
