import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JwtInterceptor } from './jwt.interceptor';

describe('JwtInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  const dummyUrl = '/test-endpoint';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true
        }
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should add Authorization header if token exists', () => {
    const testToken = 'test-jwt-token';
    localStorage.setItem('token', testToken);

    http.get(dummyUrl).subscribe();

    const req = httpMock.expectOne(dummyUrl);
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${testToken}`);
    req.flush({});
  });

  it('should NOT add Authorization header if token does not exist', () => {
    http.get(dummyUrl).subscribe();

    const req = httpMock.expectOne(dummyUrl);
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });
});
