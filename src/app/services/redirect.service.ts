import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { RedirectsData } from '../models/redirects.data';

@Injectable({ providedIn:'root' })
export class RedirectService {

    constructor(private http:HttpClient) {}

    getAll(page:number, group_id = null): Observable<RedirectsData> {
        let url;
        url = environment.api_url + `redirects?page=${page}`;

        if(group_id) {
            url = environment.api_url + `redirects?page=${page}&group_id=${group_id}`;
        }
        return this.http.get<RedirectsData>(url);
    }

    check(data:any): Observable<any> {
        const url = environment.api_url + 'redirects';
        return this.http.post<any>(url, data, this.httpOptions);
    }

    httpOptions = {
        headers:new HttpHeaders({ 'Content-Type':'application/json' })
    }
}