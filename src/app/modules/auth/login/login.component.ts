import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  
    const loginPayload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };  
    
    this.authService.login(loginPayload).subscribe({
      next: (response) => {
        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.snackBar.open('Invalid email or password', 'Close', {
          duration: 3000,
        });
      },
    });
  }
  

  facebookLogin(){
    
  }
  googleLogin() {
    this.authService.googleLogin();
  }

}
