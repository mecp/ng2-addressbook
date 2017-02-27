import { PubNubAngular } from 'pubnub-angular2';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  //Put your publish and subscribe key here
  private publishKey = '';
  private subscribeKey = '';
  
  private channel: string = 'notifications';
  private isPubnubAvailable = false;
  private subscriptionCallback;

  constructor(private pubnubService: PubNubAngular) {
    if(this.publishKey && this.subscribeKey) {
      pubnubService.init({
          publishKey: this.publishKey,
          subscribeKey: this.subscribeKey
        });

      this.isPubnubAvailable = true;
    }
  }

  publish(message: any, respCallback?: (response: any) => void) {
    if(this.isPubnubAvailable) {
      this.pubnubService.publish({channel: this.channel, message: message }, (response) => {
          if(respCallback)
              respCallback(response);
      });
    } else {
      if(this.subscriptionCallback)
        this.subscriptionCallback({ message: message});
    }
  }

  subscribe(callback: (message: any) => void) {
    if(this.isPubnubAvailable) {
      this.pubnubService.subscribe({channels: [this.channel], triggerEvents: ['message']});
      this.pubnubService.getMessage(this.channel, (message) => callback(message)); 
    } else {
      this.subscriptionCallback = callback;
    }
  }

  unsubscribe() {
    if(this.isPubnubAvailable) {
      this.pubnubService.unsubscribe({channels: [this.channel]});
    } else {
      this.subscriptionCallback = null;
    }
  }
}