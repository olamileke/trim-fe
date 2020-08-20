import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { NotificationService } from '../services/notification.service';

@Injectable({ providedIn:'root' })
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(private notif:NotificationService, private router:Router) {}

    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(catchError((error:any) => this.handleError<any>(error)))
    }

    handleError<T>(error:any) {
        console.log(error);
        const url = error.url.split(environment.api_url)[1];
        let displayed = false;

        if(error.status == 401) {
            localStorage.clear();
            this.router.navigate(['/auth/login']);
            this.notif.error('You are not logged in');
            displayed = true;
        }

        if(url == 'redirects') {
            if(error.status == 404) {
                this.router.navigate(['/error/404']);
                displayed = true;
            }
        }

        if(url == 'users') {
            if(error.status == 403) {
                this.notif.error('User with that email exists');
                displayed = true;
            }

            if(error.status == 400) {
                if(error.error.error.message.includes('invalid')) {
                    this.notif.error('Invalid reset token');
                }
                else {
                    this.notif.error('Expired reset token');
                }
                this.router.navigate(['/auth/login']);
                displayed = true;   
            }
        }

        if(url == 'users?type=activate') {
            if(error.status == 400) {
                this.notif.error('User does not exist');
                displayed = true;
            }
        }

        if(url == 'password/reset?action=mail') {
            if(error.status == 404) {
                this.notif.error('No user exists with that email');
                displayed = true;
            }
        }

        if(url == 'password/reset?action=verify') {
            if(error.status == 400) {
                if(error.error.message.includes('invalid')) {
                    this.notif.error('Invalid reset token');
                }
                else {
                    this.notif.error('Expired reset token');
                }
                this.router.navigate(['/auth/login']);
                displayed = true;
            }
        }

        if(url == 'authenticate') {
            if(error.status == 404) {
                this.notif.error('Incorrect email or password');
                displayed = true;
            }
        }

        if(url == 'groups') {
            if(error.status == 403) {
                if(error.error.message.includes('name')) {
                    this.notif.error('group exists with specified name');
                    displayed = true;
                } 

                if(error.error.message.includes('url')) {
                    this.notif.error('group exists with specified url');
                    displayed = true;
                } 
            } 
        }

        if(url.includes('groups') && url.length == 8) {
            if(error.status == 403) {
                if(error.error.message.includes('name')) {
                    this.notif.error('group exists with specified name');
                    displayed = true;
                } 
    
                if(error.error.message.includes('url')) {
                    this.notif.error('group exists with specified url');
                    displayed = true;
                } 
            }
        }

        if(url == 'urls') {
            if(error.status == 403 && error.error.message.includes('shortened')) {
                this.notif.error('url has been shortened already');
                displayed = true;
            }

            if(error.status == 403 && error.error.message.includes('available')) {
                this.notif.error('short link is not available');
                displayed = true;
            }
        }

        if(url.includes('urls') && url.length == 6) {
            if(error.status == 403 && error.error.message.includes('shortened')) {
                this.notif.error('url has been shortened already');
                displayed = true;
            }

            if(error.status == 403 && error.error.message.includes('available')) {
                this.notif.error('short link is not available');
                displayed = true;
            }
        }

        if(!displayed) {
            if(url == 'redirects') {
                this.router.navigate(['/']);
            }
                this.notif.error('An error occurred');
        }

        return of(error as T);
    }
}