import { Url } from './url';
import { Redirect } from './redirect'

export interface Group {
    id:number,
    name:string,
    url:string,
    num_urls?:number,
    num_redirects?:number,
    urls?:Url[],
    redirects?:Redirect[],
    created_at?:string
}