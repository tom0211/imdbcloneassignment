import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { AddComponent } from './add/add.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { MovieeditComponent } from './movieedit/movieedit.component';
import { AddmovieComponent } from './addmovie/addmovie.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddmovieComponent, canActivate: [AuthGuard] },
  { path: 'movie', component: MoviedetailsComponent, canActivate: [AuthGuard] },
  { path: 'movieedit', component: MovieeditComponent, canActivate: [AuthGuard] },
  { path: 'addmovie', component: AddmovieComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService]
})
export class AppRoutingModule { }
