import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']); // Redirect to dashboard
    }
  }
  onRegister() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.apiService.register(username, password).subscribe((response) => {
        // console.log(response.user);

        // if (response.user) {
        this.authService.login(response.user._id);
        this.router.navigate(['/dashboard'])
        // } else {
        //   alert(response.message)
        // }
      }, (error) => {
        alert(error.error.message);
        console.log(error);
        return;
      });
    }
  }
  onSubmit() {
    console.log('submitting form');

    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.apiService.login(username, password).subscribe((response) => {
        this.authService.login(response.user._id);
        this.router.navigate(['/dashboard'])
      }, (error) => {
        console.log(error);
        if (error.status == 401) {
          alert(error.error.message)
          console.log(error.error.message);
          return;
        }
        if (error.status == 404) {
          alert(error.error.message)
          console.log(error.error.message);
          return;
        }
      });
    }
  }
}
