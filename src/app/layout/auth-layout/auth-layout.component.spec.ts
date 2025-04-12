import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthLayoutComponent } from './auth-layout.component';
import { RouterOutlet } from '@angular/router';

describe('AuthLayoutComponent', () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthLayoutComponent],
      imports: [RouterOutlet]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a div with class "auth-wrapper"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const wrapper = compiled.querySelector('.auth-wrapper');
    expect(wrapper).not.toBeNull();
  });

  it('should contain a router-outlet inside the auth-wrapper', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const outlet = compiled.querySelector('.auth-wrapper router-outlet');
    expect(outlet).not.toBeNull();
  });
});
