import { Router } from '@angular/router';
import { RedirectService } from '../services/redirect.service';

export function initApp(router:Router, redirect:RedirectService) {
    return async () => {
        let path = window.location.pathname;

        if(path == '' || path == '/') {
            return new Promise((resolve) => {
                resolve()
            })
        }

        if(path.split('/').length > 2 || path == '/dashboard') {
            return new Promise((resolve) => {
                resolve()
            })
        }

        path = path.replace('/', '');

        let referrer;
        document.referrer ? referrer = document.referrer : referrer = ''; 

        const data = { short_path:path, referrer };

        return await redirect.check(data)
        .toPromise()
        .then((res:any) => {
            location.replace(res.data.path);
        })
        .catch(err => {
            router.navigate(['/error/404']);
        })
    }
}