import { Injectable } from '@angular/core';
import { Client } from 'colyseus.js';


@Injectable({
  providedIn: 'root'
})
export class ColyseusService {
  private client = new Client("ws://localhost:2567")
  constructor() { }

  async joinRoom() {
    console.log('joining room')
    const room = await this.client.joinOrCreate('my_room')
    console.log('room is open', room.connection.isOpen)
  }
}
