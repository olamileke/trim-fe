import { Injectable } from '@angular/core';
import { UrlData } from '../models/url.data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod'; 

@Injectable({ providedIn:'root' })
export class UrlService {

    constructor(private http:HttpClient) {}

    getAll(page:number): Observable<UrlData> {
        const url = environment.api_url + `urls?page=${page}`;
        return this.http.get<UrlData>(url);
    }

    get(id:number): Observable<any> {
        const url = environment.api_url + `urls/${id}`;
        return this.http.get<any>(url);
    }

    edit(id:number, data:any): Observable<any> {
        const url = environment.api_url + `urls/${id}`;
        return this.http.patch<any>(url, data, this.httpOptions);
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