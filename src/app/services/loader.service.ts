import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn:'root' })
export class LoaderService {

    constructor() {}

    load = new Subject<boolean>();

    show(): void {
        this.load.next(true);
    }

    hide(): void {
        this.load.next(false);
    }
}