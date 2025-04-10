import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
})
export class BlogCreateComponent implements OnInit {
  blogForm!: FormGroup;
  blogId?: number;
  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.blogId = params['id']!;
    })

    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  createPost(): void {
    if (this.blogForm.valid) {
      this.blogService.create(this.blogForm.value).subscribe(() => {
        this.router.navigate(['/blog']);
      });
    }
  }

  updatePost(): void {
    if (this.blogForm.valid) {
      const updatedData = {
        id: this.blogId, 
        ...this.blogForm.value 
      };
      this.blogService.update(updatedData).subscribe(() => {
        this.router.navigate(['/blog']);
      });
    }
  }
  
}
