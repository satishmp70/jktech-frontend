import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BlogService } from './blog.service';
import { environment } from 'src/app/environments/environment';

describe('BlogService', () => {
  let service: BlogService;
  let httpMock: HttpTestingController;
  const API_URL = `${environment.apiUrl}/blog`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService]
    });

    service = TestBed.inject(BlogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all blogs', () => {
    const mockData = [{ id: 1, title: 'Test', content: 'Content' }];

    service.getAll().subscribe(res => {
      expect(res).toEqual(mockData);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch my blogs', () => {
    const mockData = [{ id: 1, title: 'My Blog', content: 'Private' }];

    service.getMyBlogs().subscribe(res => {
      expect(res).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${API_URL}/my`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch one blog by ID', () => {
    const id = 1;
    const mockData = { id: 1, title: 'Single Blog', content: 'Details' };

    service.getOne(id).subscribe(res => {
      expect(res).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${API_URL}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should create a blog', () => {
    const blog = { title: 'New Blog', content: 'Fresh content' };

    service.create(blog).subscribe(res => {
      expect(res).toEqual(blog);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(blog);
    req.flush(blog);
  });

  it('should update a blog', () => {
    const updatedBlog = { id: 1, title: 'Updated Blog', content: 'Updated content' };

    service.update(updatedBlog).subscribe(res => {
      expect(res).toEqual(updatedBlog);
    });

    const req = httpMock.expectOne(`${API_URL}/${updatedBlog.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedBlog);
    req.flush(updatedBlog);
  });
});
