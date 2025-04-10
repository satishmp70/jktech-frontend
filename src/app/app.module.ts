import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './core/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BlogModule } from './modules/blog/blog.module';
import { LayoutsModule } from './layout/layout.module';
import { environment } from './environments/environment';
import { provideFirebaseApp, initializeApp as initializeAngularApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    LayoutsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AuthModule,
    UsersModule,
    BlogModule,
    BrowserAnimationsModule ,
    provideFirebaseApp(() => initializeAngularApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
function initializeApp(firebase: { apiKey: string; authDomain: string; projectId: string; storageBucket: string; messagingSenderId: string; appId: string; }) {
  throw new Error('Function not implemented.');
}

