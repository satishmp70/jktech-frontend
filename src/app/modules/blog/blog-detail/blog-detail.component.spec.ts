import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogDetailComponent } from './blog-detail.component';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BlogDetailComponent', () => {
  let component: BlogDetailComponent;
  let fixture: ComponentFixture<BlogDetailComponent>;
  let blogServiceSpy: jasmine.SpyObj<BlogService>;

  const mockBlog = {
    id: 1,
    title: 'Test Blog',
    content: 'This is a test blog post.'
  };

  beforeEach(async () => {
    blogServiceSpy = jasmine.createSpyObj('BlogService', ['getOne']);

    await TestBed.configureTestingModule({
      declarations: [BlogDetailComponent],
      providers: [
        { provide: BlogService, useValue: blogServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1'  // Simulate route param id = 1
              }
            }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BlogDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch blog data on init', () => {
    blogServiceSpy.getOne.and.returnValue(of(mockBlog));

    component.ngOnInit();

    expect(blogServiceSpy.getOne).toHaveBeenCalledWith(1);
    expect(component.blog).toEqual(mockBlog);
  });
});
