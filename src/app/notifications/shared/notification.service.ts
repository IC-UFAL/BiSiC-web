import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class NotificationService {

  public notificationEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

}
