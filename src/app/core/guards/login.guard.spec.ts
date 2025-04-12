import { TestBed } from '@angular/core/testing';
import { LoginGuard } from './login.guard';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authMock = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        { provide: AuthService, useValue: authMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(LoginGuard);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should prevent access and redirect to /home if authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(authServiceSpy.isAuthenticated).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should allow access if not authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    const result = guard.canActivate();

    expect(result).toBeTrue();
    expect(authServiceSpy.isAuthenticated).toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
