import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogCreateComponent } from './blog-create.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('BlogCreateComponent', () => {
  let component: BlogCreateComponent;
  let fixture: ComponentFixture<BlogCreateComponent>;
  let blogServiceSpy: jasmine.SpyObj<BlogService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    blogServiceSpy = jasmine.createSpyObj('BlogService', ['create', 'update']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [BlogCreateComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: BlogService, useValue: blogServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 42 })
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BlogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and set blogId from route params', () => {
    expect(component.blogForm).toBeTruthy();
    expect(component.blogForm.controls['title']).toBeTruthy();
    expect(component.blogForm.controls['content']).toBeTruthy();
    expect(component.blogId).toBe(42);
  });

  it('should call blogService.create() and navigate on createPost()', () => {
    component.blogForm.setValue({ title: 'Test Title', content: 'Test Content' });
    blogServiceSpy.create.and.returnValue(of({}));

    component.createPost();

    expect(blogServiceSpy.create).toHaveBeenCalledWith({
      title: 'Test Title',
      content: 'Test Content'
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/blog']);
  });

  it('should not call blogService.create() if form is invalid', () => {
    component.blogForm.setValue({ title: '', content: '' });

    component.createPost();

    expect(blogServiceSpy.create).not.toHaveBeenCalled();
  });

  it('should call blogService.update() and navigate on updatePost()', () => {
    component.blogForm.setValue({ title: 'Updated Title', content: 'Updated Content' });
    component.blogId = 42;
    blogServiceSpy.update.and.returnValue(of({}));

    component.updatePost();

    expect(blogServiceSpy.update).toHaveBeenCalledWith({
      id: 42,
      title: 'Updated Title',
      content: 'Updated Content'
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/blog']);
  });

  it('should not call blogService.update() if form is invalid', () => {
    component.blogForm.setValue({ title: '', content: '' });

    component.updatePost();

    expect(blogServiceSpy.update).not.toHaveBeenCalled();
  });
});
