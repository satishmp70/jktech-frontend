import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogListingComponent } from './blog-listing/blog-listing.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: BlogListingComponent },
  { path: 'create', component: BlogCreateComponent, canActivate: [AuthGuard] },
  { path: ':id', component: BlogDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {}
