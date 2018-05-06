import {Component} from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  controll = false;

  constructor() { }

  setControl() {
    this.controll = true;
  }
}
