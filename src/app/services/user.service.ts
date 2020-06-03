import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

import { UserData } from '../models/user.data';

@Injectable({ providedIn:'root' })
export class UserService {

    constructor(private http:HttpClient) {}

    signup(data): Observable<UserData> {
        const url = environment.api_url + 'users';
        return this.http.post<UserData>(url, data, this.httpOptions);
    }

    changeAvatar(data): Observable<UserData> {
        const url = environment.api_url + 'users';
        return this.http.patch<UserData>(url, data, this.httpOptions);
    }

    httpOptions = {
        headers:new HttpHeaders({ 'Content-Type':'application/json' })
    }
}