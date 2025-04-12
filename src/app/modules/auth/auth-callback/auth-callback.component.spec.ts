import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthCallbackComponent } from './auth-callback.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

describe('AuthCallbackComponent', () => {
  let component: AuthCallbackComponent;
  let fixture: ComponentFixture<AuthCallbackComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const createActivatedRouteMock = (token: string | null, provider: string | null) => ({
    snapshot: {
      queryParamMap: {
        get: (key: string) => {
          if (key === 'token') return token;
          if (key === 'provider') return provider;
          return null;
        }
      }
    }
  });

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['setToken']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AuthCallbackComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ]
    }).compileComponents();
  });

  const createComponentWithRoute = (token: string | null, provider: string | null) => {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: createActivatedRouteMock(token, provider)
    });

    fixture = TestBed.createComponent(AuthCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should set token and provider and navigate to /home when both are present', () => {
    spyOn(localStorage, 'setItem');
    createComponentWithRoute('abc123', 'google');

    expect(mockAuthService.setToken).toHaveBeenCalledWith('abc123');
    expect(localStorage.setItem).toHaveBeenCalledWith('provider', 'google');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should set token and navigate to /home when provider is missing', () => {
    spyOn(localStorage, 'setItem');
    createComponentWithRoute('abc123', null);

    expect(mockAuthService.setToken).toHaveBeenCalledWith('abc123');
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to /auth/login when token is missing', () => {
    createComponentWithRoute(null, 'google');

    expect(mockAuthService.setToken).not.toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
  });
});
