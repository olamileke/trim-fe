import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn:'root' })
export class StatsService {

    constructor(private http:HttpClient) {}

    get(): Observable<any> {
        const url = environment.api_url + 'stats';
        return this.http.get<any>(url);
    }
}