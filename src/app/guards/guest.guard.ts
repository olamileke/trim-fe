import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({ providedIn:'root' })
export class GuestGuard implements CanActivate {

    constructor(private router:Router, private notif:NotificationService,
    private auth:AuthService) {}

    canActivate(): boolean {

        if(this.auth.isAuth()) {
            this.router.navigate(['/dashboard']);
            return false;
        }

        return true;
    }
}
