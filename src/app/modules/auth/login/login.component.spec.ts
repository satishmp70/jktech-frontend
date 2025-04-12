import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'facebookLogin', 'googleLogin']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should validate email field', () => {
    const email = component.loginForm.controls['email'];
    email.setValue('not-an-email');
    expect(email.valid).toBeFalse();

    email.setValue('test@example.com');
    expect(email.valid).toBeTrue();
  });

  it('should call onSubmit() when form is valid', () => {
    spyOn(component, 'onSubmit');
    component.loginForm.setValue({ email: 'test@example.com', password: 'pass123' });

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should show error when form is invalid on submit', () => {
    component.loginForm.setValue({ email: '', password: '' });
    component.onSubmit();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should login and navigate on successful submit', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });
    authServiceSpy.login.and.returnValue(of({ accessToken: 'fake-jwt' }));
  
    component.onSubmit();
  
    expect(authServiceSpy.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password'
    });
    expect(snackBarSpy.open).toHaveBeenCalledWith('Login successful!', 'Close', { duration: 3000 });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show error on failed login', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'wrongpass' });
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Unauthorized')));

    component.onSubmit();

    expect(snackBarSpy.open).toHaveBeenCalledWith('Invalid email or password', 'Close', {
      duration: 3000,
    });
  });

  it('should call facebookLogin()', () => {
    component.facebookLogin();
    expect(authServiceSpy.facebookLogin).toHaveBeenCalled();
  });

  it('should call googleLogin()', () => {
    component.googleLogin();
    expect(authServiceSpy.googleLogin).toHaveBeenCalled();
  });
});
