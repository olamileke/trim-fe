import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn:'root' })
export class AuthService {
    
    constructor(private http:HttpClient) {}

    login(data:any): Observable<any> {
        
        const url = environment.api_url + 'authenticate';
        return this.http.post<any>(url, data, this.httpOptions);
    }

    isAuth(): boolean {
        const token = localStorage.getItem('trim_token');

        if(!token) {
            return false;
        }
        return true;
    }

    httpOptions = {
        headers:new HttpHeaders({ 'Content-Type':'application/json'} )
    }
}