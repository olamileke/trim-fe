import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NotificationService } from '../services/notification.service';

@Injectable({ providedIn:'root' })
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(private notif:NotificationService) {}

    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(catchError((error:any) => this.handleError<any>(error)))
    }

    handleError<T>(error:any) {
        console.log(error);
        const url = error.url.split(environment.api_url)[1];
        let displayed = false;

        if(url == 'users') {
            if(error.status == 403) {
                this.notif.error('User with that email exists');
                displayed = true;
            }
        }

        if(url == 'authenticate') {
            if(error.status == 404) {
                this.notif.error('Invalid email or password');
                displayed = true;
            }
        }

        if(!displayed) {
            this.notif.error('An error occurred');
        }

        return of(error as T);
    }
}