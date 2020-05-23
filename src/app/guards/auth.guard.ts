import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({ providedIn:'root' })
export class AuthGuard implements CanActivate {

    constructor(private router:Router, private notif:NotificationService,
    private auth:AuthService) {}

    canActivate(): boolean {

        if(!this.auth.isAuth()) {
            this.router.navigate(['/auth/login']);
            this.notif.error('You are not logged in');
            return false;
        }

        return true;
    }
}
