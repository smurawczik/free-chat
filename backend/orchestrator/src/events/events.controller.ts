import { Body, Controller, HttpStatus, Post, Res, Sse } from '@nestjs/common';
import { EventsService } from './events.service';
import { Response } from 'express';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Sse('lastConnection')
  subscribeLastConnection() {
    return this.eventsService.subscribeLastConnection();
  }

  @Post('last-connection-event')
  async lastConnection(
    @Res() res: Response,
    @Body() body: { userId: string; lastConnection: string },
  ) {
    // Emit the event to the frontend with new connection data
    this.eventsService.emitLastConnection(body);

    return res.status(HttpStatus.OK).send({ message: 'OK' });
  }

  @Sse('contactAccepted')
  subscribeContactAccepted() {
    return this.eventsService.subscribeContactAccepted();
  }

  @Post('contact-accepted-event')
  async contactAccepted(
    @Res() res: Response,
    @Body() body: { contactId: string; accepted: boolean },
  ) {
    // Emit the event to the frontend with accepted or rejected contact data
    this.eventsService.emitContactAccepted(body);

    return res.status(HttpStatus.OK).send({ message: 'OK' });
  }
}
