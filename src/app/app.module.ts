import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { NavbarModule } from './navbar/navbar.module';
import { AddModule } from './add/add.module';
import { MoviedetailsModule } from './moviedetails/moviedetails.module';
import { MovieeditModule } from './movieedit/movieedit.module';
import { AddmovieModule } from './addmovie/addmovie.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    DashboardModule,
    AddModule,
    NavbarModule,
    MoviedetailsModule,
    MovieeditModule,
    AddmovieModule,
    BrowserAnimationsModule,
    MatSelectModule, MatFormFieldModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
