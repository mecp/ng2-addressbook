import { PubNubAngular } from 'pubnub-angular2';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  private channel: string = 'notifications';
  constructor(private pubnubService: PubNubAngular) {
    pubnubService.init({
        publishKey: 'pub-c-fe6635ff-b39b-47cf-a978-7515910ecc20',
        subscribeKey: 'sub-c-60702516-fb47-11e6-8fcb-0619f8945a4f'
      });
  }

  publish(message: any, respCallback?: (response: any) => void) {
    this.pubnubService.publish({channel: this.channel, message: message }, (response) => {
        if(respCallback)
            respCallback(response);
     });
  }

  subscribe(callback: (message: any) => void) {
    this.pubnubService.subscribe({channels: [this.channel], triggerEvents: ['message']});
    this.pubnubService.getMessage(this.channel, (message) => callback(message));
  }

  unsubscribe() {
      this.pubnubService.unsubscribe({channels: [this.channel]});
  }
}