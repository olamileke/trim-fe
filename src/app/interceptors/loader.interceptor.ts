import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoaderService } from '../services/loader.service';

@Injectable({ providedIn:'root' })
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private loader:LoaderService) {}

    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {

        req.url.includes('redirects') && req.method.toLowerCase() == 'post' ? '' : this.loader.show();
        
        return next.handle(req).pipe(finalize(() => this.loader.hide()));        
    }
}