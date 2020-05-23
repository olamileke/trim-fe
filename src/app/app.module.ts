import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';

import { HttpInterceptors } from './interceptors/http.interceptors';
import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';
import { LoaderComponent } from './components/loader/loader.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    LoaderComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    HttpInterceptors,
    UserService,
    NotificationService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
