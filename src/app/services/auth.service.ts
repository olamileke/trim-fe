import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { NotificationService } from './notification.service';

@Injectable({ providedIn:'root' })
export class AuthService {
    
    constructor(private http:HttpClient, private router:Router,
    private notif:NotificationService) {}

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

    logout(): void {
        localStorage.clear();
        this.notif.success('Logged out successfully');
        this.router.navigate(['/auth/login']);
    }

    verifyEmail(data): Observable<any> {
        const url = environment.api_url + 'password/reset?action=mail';
        return this.http.post<any>(url, data, this.httpOptions);
    }

    verifyResetToken(data): Observable<any> {
        const url = environment.api_url + 'password/reset?action=verify';
        return this.http.post<any>(url, data);
    }

    httpOptions = {
        headers:new HttpHeaders({ 'Content-Type':'application/json'} )
    }
}