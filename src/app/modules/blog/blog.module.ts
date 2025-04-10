import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogListingComponent } from './blog-listing/blog-listing.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared/shared.module';


@NgModule({
  declarations: [
    BlogListingComponent,
    BlogCreateComponent,
    BlogDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BlogRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class BlogModule { }
