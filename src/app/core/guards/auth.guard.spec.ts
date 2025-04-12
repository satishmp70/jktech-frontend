import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UrlTree } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    const routerMock = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow activation if user is authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    const result = guard.canActivate();

    expect(result).toBeTrue();
    expect(authServiceSpy.isAuthenticated).toHaveBeenCalled();
  });

  it('should redirect to login if user is not authenticated', () => {
    const mockUrlTree = {} as UrlTree;
    authServiceSpy.isAuthenticated.and.returnValue(false);
    routerSpy.parseUrl.and.returnValue(mockUrlTree);

    const result = guard.canActivate();

    expect(authServiceSpy.isAuthenticated).toHaveBeenCalled();
    expect(routerSpy.parseUrl).toHaveBeenCalledWith('/auth/login');
    expect(result).toBe(mockUrlTree);
  });
});
