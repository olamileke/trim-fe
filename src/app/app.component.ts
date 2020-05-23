import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trim-fe';

  constructor(private loader:LoaderService) {}

  isLoading:Subject<boolean> = this.loader.load;

}
