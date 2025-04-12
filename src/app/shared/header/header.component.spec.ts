import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

class MockAuthService {
  isAuthenticated = jasmine.createSpy().and.returnValue(true);
  getRole = jasmine.createSpy().and.returnValue('admin');
  logout = jasmine.createSpy();
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: MockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: {} }  // Dummy router
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as any;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoggedIn to true', () => {
    expect(component.isLoggedIn).toBeTrue();
    expect(authService.isAuthenticated).toHaveBeenCalled();
  });

  it('should set userRole to "admin"', () => {
    expect(component.userRole).toBe('admin');
    expect(authService.getRole).toHaveBeenCalled();
  });

  it('should call logout on authService when logout() is called', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should return true for isAdmin() if user role is "admin"', () => {
    expect(component.isAdmin()).toBeTrue();
  });

  it('should return false for isAdmin() if user role is not "admin"', () => {
    authService.getRole.and.returnValue('user'); 
    expect(component.isAdmin()).toBeFalse();
  });
});
