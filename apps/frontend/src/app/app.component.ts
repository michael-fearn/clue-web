import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Client, Room } from 'colyseus.js';
import { SumRoomState } from '@lib/schemas';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  inRoom = false;
  private client = new Client('ws://localhost:2567');
  private room!: Room<SumRoomState>;

  constructor() {}

  async ngOnInit() {
    this.room = await this.client.joinOrCreate('sum_room');
    this.room.state;

    this.room.onStateChange((state) => {
      console.log(state);
    });

    this.room.onMessage('*', (type, message) => {
      console.log(type, message.this.room.state);
    });
  }

  playCard()
}

// joined room
// Room View
// Round Number | Current Played
// 
// sum
// isPlayerTurn
// clickableplayer cards
