import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn = this.authService.isAuthenticated();
  userRole = this.authService.getRole();

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
  }
  
  isAdmin(): boolean {
    return this.authService.getRole() === 'admin';
  }
  
}
