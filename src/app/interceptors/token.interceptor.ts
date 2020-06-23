import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn:'root' })
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth:AuthService) {}

    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {

        if(this.auth.isAuth()) {
            const token = localStorage.getItem('trim_token');
            const endpoint = req.url.split(environment.api_url)[1];
            let headers;

            if(endpoint == 'users?field=avatar') {
                headers = {'Authorization':`Bearer ${token}`};
            }
            else {
                headers =  {'Authorization':`Bearer ${token}`, 'Content-Type':'application/json'};
            }
            
            const reqclone = req.clone({
                setHeaders:headers
            });
            return next.handle(reqclone);
        }

        return next.handle(req);
    }
}