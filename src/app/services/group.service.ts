import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupData } from '../models/group.data';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn:'root' })
export class GroupService {

    constructor(private http:HttpClient) {}

    get(id:number): Observable<GroupData> {
        const url = environment.api_url + `groups/${id}`;
        return this.http.get<GroupData>(url);
    }

    getAll(): Observable<GroupData> {
        const url = environment.api_url + 'groups';
        return this.http.get<GroupData>(url);
    }

    create(data:any): Observable<GroupData> {
        const url = environment.api_url + 'groups';
        return this.http.post<GroupData>(url, data, this.httpOptions);
    }

    edit(id:number, data:any): Observable<any> {
        const url = environment.api_url + `groups/${id}`;
        return this.http.patch<any>(url, data, this.httpOptions);
    }

    delete(id:number): Observable<any> {
        const url = environment.api_url + `groups/${id}`;
        return this.http.delete<any>(url, this.httpOptions);
    }

    httpOptions = {
        headers:new HttpHeaders({ 'Content-Type':'application/json' })
    }
}