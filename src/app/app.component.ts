import { Component } from '@angular/core';

import { ChatServiceService } from './providers/chat-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dino-Chat';


  constructor(public _cs:ChatServiceService) {
    
  }
}
