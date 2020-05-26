import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn:'root' })
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth:AuthService) {}

    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {

        if(this.auth.isAuth()) {
            const token = localStorage.getItem('trim_token');
            
            const reqclone = req.clone({
                setHeaders:{ 'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json' }
            });
            return next.handle(reqclone);
        }

        return next.handle(req);
    }
}