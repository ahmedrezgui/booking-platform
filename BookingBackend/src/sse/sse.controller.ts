import { Controller, Sse, UseGuards } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CurrentUser } from 'src/decorators/user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/entities/user.entity';
import { fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@UseGuards(JwtGuard)
@Controller('sse')
export class SseController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Sse()
  sse(@CurrentUser() SubscribedUser: User): Observable<MessageEvent> {
    const reservation_event = fromEvent(this.eventEmitter, 'reservation.**');

    return reservation_event.pipe(
      map((payload : any) => {
        const { reservation, user, listing } = payload;

        if (
          SubscribedUser.id === listing.host ||
          user.id === SubscribedUser.id
        ) {
          const notification = 'true';
          return new MessageEvent('event', { data: { notification } });
        }
        const notification = 'false';
        return new MessageEvent('event', { data: { notification } });
      }),
    );
  }
}
