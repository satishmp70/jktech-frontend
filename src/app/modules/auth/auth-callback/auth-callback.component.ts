import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    const provider = this.route.snapshot.queryParamMap.get('provider');

    if (token) {
      this.authService.setToken(token);
      if (provider) {
        localStorage.setItem('provider', provider);
      }
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
