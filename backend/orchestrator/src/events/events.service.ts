import { Injectable } from '@nestjs/common';
import { fromEvent } from 'rxjs';
import { EventEmitter } from 'events';

@Injectable()
export class EventsService {
  private readonly emitter: EventEmitter;

  constructor() {
    // Inject some Service here and everything about SSE will stop to work.
    this.emitter = new EventEmitter();
  }

  subscribeLastConnection() {
    return fromEvent(this.emitter, 'lastConnection');
  }

  async emitLastConnection(data: { userId: string; lastConnection: string }) {
    try {
      this.emitter.emit('lastConnection', { data });
    } catch (error) {
      console.log('emitLastConnection error', error);
    }
  }

  subscribeContactAccepted() {
    return fromEvent(this.emitter, 'contactAccepted');
  }

  async emitContactAccepted(data: { contactId: string; accepted: boolean }) {
    try {
      this.emitter.emit('contactAccepted', { data });
    } catch (error) {
      console.log('emitContactAccepted error', error);
    }
  }
}
