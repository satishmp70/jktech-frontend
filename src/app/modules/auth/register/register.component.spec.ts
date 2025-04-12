import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { of, throwError } from 'rxjs';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatSnackBarModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    const form = component.registerForm;
    expect(form).toBeDefined();
    expect(form.get('name')?.value).toBe('');
    expect(form.get('email')?.value).toBe('');
    expect(form.get('roleId')?.value).toBe(2);
  });

  it('should not submit if form is invalid', () => {
    component.registerForm.patchValue({ email: '', password: '' });
    component.onSubmit();
    expect(authServiceSpy.register).not.toHaveBeenCalled();
  });

  it('should call register and navigate on success', () => {
    component.registerForm.setValue({
      name: 'Test',
      email: 'test@example.com',
      password: 'pass1234',
      roleId: 2
    });

    authServiceSpy.register.and.returnValue(of({}));

    component.onSubmit();

    expect(authServiceSpy.register).toHaveBeenCalledWith(component.registerForm.value);
    expect(snackBarSpy.open).toHaveBeenCalledWith('Registration successful!', 'Close', { duration: 3000 });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should show error message on register failure', () => {
    component.registerForm.setValue({
      name: 'Test',
      email: 'test@example.com',
      password: 'pass1234',
      roleId: 2
    });

    authServiceSpy.register.and.returnValue(throwError(() => new Error('Registration failed')));

    component.onSubmit();

    expect(snackBarSpy.open).toHaveBeenCalledWith('Registration failed', 'Close', { duration: 3000 });
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
