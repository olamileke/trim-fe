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
import { AuthHomeComponent } from './components/auth-home/auth-home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { GroupsComponent } from './components/groups/groups.component';
import { ShortenComponent } from './models/components/shorten/shorten.component';
import { ShortenedUrlsComponent } from './components/shortened-urls/shortened-urls.component';
import { EditGroupComponent } from './components/edit-group/edit-group.component';
import { GroupComponent } from './components/group/group.component';
import { UrlComponent } from './components/url/url.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { ViewUrlComponent } from './components/view-url/view-url.component';
import { EditUrlComponent } from './components/edit-url/edit-url.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    LoaderComponent,
    DashboardComponent,
    AuthHomeComponent,
    SidebarComponent,
    HeaderComponent,
    NewGroupComponent,
    GroupsComponent,
    ShortenComponent,
    ShortenedUrlsComponent,
    EditGroupComponent,
    GroupComponent,
    UrlComponent,
    RedirectComponent,
    ViewUrlComponent,
    EditUrlComponent
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
