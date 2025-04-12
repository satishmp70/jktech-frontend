import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogListingComponent } from './blog-listing.component';
import { BlogService } from '../blog.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BlogListingComponent', () => {
  let component: BlogListingComponent;
  let fixture: ComponentFixture<BlogListingComponent>;
  let blogServiceSpy: jasmine.SpyObj<BlogService>;

  const mockBlogs = [
    { id: 1, title: 'Blog One', content: 'Content One' },
    { id: 2, title: 'Blog Two', content: 'Content Two' }
  ];

  beforeEach(async () => {
    blogServiceSpy = jasmine.createSpyObj('BlogService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [BlogListingComponent],
      providers: [
        { provide: BlogService, useValue: blogServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BlogListingComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch blogs on init and assign to blogs array', () => {
    blogServiceSpy.getAll.and.returnValue(of(mockBlogs));

    component.ngOnInit();

    expect(blogServiceSpy.getAll).toHaveBeenCalled();
    expect(component.blogs).toEqual(mockBlogs);
  });
});
