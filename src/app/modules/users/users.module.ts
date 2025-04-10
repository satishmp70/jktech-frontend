import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { UsersService } from './users.service';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UsersComponent } 
    ])
  ],
  providers: [UsersService]
})
export class UsersModule {}
