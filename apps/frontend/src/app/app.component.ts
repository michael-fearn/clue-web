import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColyseusService } from './colyseus.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  private colyseusService = inject(ColyseusService);
  constructor() {
    console.log('hello');
  }
  test() {
    this.colyseusService.joinRoom();
  }
}
