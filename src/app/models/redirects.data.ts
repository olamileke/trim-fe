import { Redirect } from './redirect';

export interface RedirectsData {
    data:{
        redirects:Redirect[],
        total_redirects:number
    }
}