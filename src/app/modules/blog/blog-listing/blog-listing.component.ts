import { Component } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-listing',
  templateUrl: './blog-listing.component.html',
  styleUrls: ['./blog-listing.component.scss']
})
export class BlogListingComponent {
  blogs: any[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getAll().subscribe((data: any) => {
      this.blogs = data;
    });
  }
}
