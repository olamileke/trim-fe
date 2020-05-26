import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupData } from '../models/group.data';
import { environment } from '../../environments/environment';

@Injectable({ providedIn:'root' })
export class GroupService {

    constructor(private http:HttpClient) {}

    create(data:any): Observable<GroupData> {

        const url = environment.api_url + 'groups';
        return this.http.post<GroupData>(url, data, this.httpOptions);
    }

    httpOptions = {
        headers:new HttpHeaders({ 'Content-Type':'application/json' })
    }
}