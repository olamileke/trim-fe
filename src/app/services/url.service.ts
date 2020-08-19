import { Injectable } from '@angular/core';
import { UrlData } from '../models/url.data';
import { UrlsData } from '../models/urls.data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod'; 

@Injectable({ providedIn:'root' })
export class UrlService {

    constructor(private http:HttpClient) {}

    getAll(page:number, group_id=null): Observable<UrlsData> {
        let url;
        url = environment.api_url + `urls?page=${page}`;

        if(group_id) {
            url = environment.api_url + `urls?page=${page}&group_id=${group_id}`;
        }
        return this.http.get<UrlsData>(url);
    }

    get(id:number): Observable<UrlData> {
        const url = environment.api_url + `urls/${id}`;
        return this.http.get<UrlData>(url);
    }

    edit(id:number, data:any): Observable<UrlData> {
        const url = environment.api_url + `urls/${id}`;
        return this.http.patch<UrlData>(url, data, this.httpOptions);
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