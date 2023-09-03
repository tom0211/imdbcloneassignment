import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() searchValueChanged = new EventEmitter<{ query: string, filter: string }>();
  selectedFilter: string = 'Titles';
  activatedPath: string | undefined;
  searchQuery: string = '';
  // switchBtnText: string;
  constructor(private authService: AuthService, private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.activatedPath = this.route.snapshot.routeConfig?.path;

    // this.switchBtnText = this.activatedPath == "add" ? "Home" : "Add";
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  switchToHomeAdd() {
    if (this.activatedPath == "add") {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/add']);
    }
  }
  goToHome() {
    this.router.navigate(['/dashboard']);
  }
  selectFilter(filter: string) {
    this.selectedFilter = filter;
  }
  onClickSerach() {
    console.log(this.searchQuery);
    this.searchValueChanged.emit({ query: this.searchQuery, filter: this.selectedFilter });


  }
}
