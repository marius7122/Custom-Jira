import { Component } from '@angular/core';
import { DataProviderService } from './dataProvider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DataProviderService ]
})
export class AppComponent {
  title = 'app';
}

