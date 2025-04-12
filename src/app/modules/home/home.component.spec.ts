import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from 'src/app/services/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getRole']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set userRole from AuthService on init', () => {
    authServiceSpy.getRole.and.returnValue('admin');

    component.ngOnInit();

    expect(authServiceSpy.getRole).toHaveBeenCalled();
    expect(component.userRole).toBe('admin');
  });
});
