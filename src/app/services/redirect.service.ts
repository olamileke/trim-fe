import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn:'root' })
export class RedirectService {

    constructor(private http:HttpClient) {}

    check(data:any): Observable<any> {
        const url = environment.api_url + 'redirects';
        return this.http.post<any>(url, data, this.httpOptions);
    }

    httpOptions = {
        headers:new HttpHeaders({ 'Content-Type':'application/json' })
    }
}