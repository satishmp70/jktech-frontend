import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
})
export class BlogDetailComponent implements OnInit {
  blog: any;

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getOne(id).subscribe(data => {
      this.blog = data;
    });
  }
}
