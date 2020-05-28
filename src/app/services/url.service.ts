import { Injectable } from '@angular/core';
import { UrlData } from '../models/url.data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn:'root' })
export class UrlService {

    constructor(private http:HttpClient) {}

    get(): Observable<UrlData> {
        const url = environment.api_url + 'urls';
        return this.http.get<UrlData>(url);
    }

    create(data:any): Observable<UrlData> {
        const url = environment.api_url + 'urls';
        return this.http.post<UrlData>(url, data, this.httpOptions);
    }

    delete(id:number): Observable<any> {
        const url = environment.api_url + `urls/${id}`;
        return this.http.delete<any>(url, this.httpOptions);
    }

    httpOptions = {
        headers:new HttpHeaders({ 'Content-Type':'application/json' })
    }
}