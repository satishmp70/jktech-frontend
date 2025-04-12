import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: router }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    (window.location.assign as jasmine.Spy)?.and?.callThrough?.();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token', () => {
    const payload = { email: 'test@example.com', password: 'password' };
    const mockToken = 'mock.jwt.token';

    service.login(payload).subscribe(response => {
      expect(response.accessToken).toBe(mockToken);
      expect(localStorage.getItem('token')).toBe(mockToken);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush({ accessToken: mockToken });
  });

  it('should register and navigate to login', () => {
    const payload = { email: 'test@example.com', password: 'password' };

    service.register(payload).subscribe(() => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/login']);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should return false if token is missing or invalid', () => {
    expect(service.isAuthenticated()).toBeFalse();
    localStorage.setItem('token', 'invalid.token');
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should logout and remove token', () => {
    localStorage.setItem('token', 'test.token');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should get and set token correctly', () => {
    service.setToken('test123');
    expect(service.getToken()).toBe('test123');
  });

  it('should get role from token', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                  'eyJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2ODg2NjY2NjZ9.' +
                  'abc123';
    localStorage.setItem('token', token);
    expect(service.getRole()).toBe('Admin');
  });

  it('should redirect to Google login', () => {
    const spy = spyOn(service, 'redirectTo');
    service.googleLogin();
    expect(spy).toHaveBeenCalledWith(`${environment.apiUrl}/auth/google`);
  });
  
  it('should redirect to Facebook login', () => {
    const spy = spyOn(service, 'redirectTo');
    service.facebookLogin();
    expect(spy).toHaveBeenCalledWith(`${environment.apiUrl}/auth/facebook`);
  });
});
