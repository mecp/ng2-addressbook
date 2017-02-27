import { Component, Renderer, ViewEncapsulation, 
          ViewChild, HostListener } from '@angular/core';

import { ModelService } from '../shared/model.service';
import { Contact } from '../shared/model/contact.model';
import { TagService } from '../shared/tag.service'
import { TagListComponent } from './tag-list.component'
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'home',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
  providers: [ TagService, NotificationService ]
})
export class HomeComponent {
    public searchText;
    public notifications = []
    public data:any = {};
    public matchedContacts: Contact[];
    public tagsTargetButton: any;
    public tagsTargetContact: Contact;
    public selectedContact: Contact;

    @ViewChild('tagListComponent')
    public tagListComponent: TagListComponent;

    constructor(public model: ModelService, public tagService: TagService, public renderer: Renderer, public notificationService: NotificationService) {
      this.notificationService.subscribe((notification) => {
            if(this.notifications.length == 10){ //Show latest 10 notifications only
              this.notifications.shift();
            }
            this.notifications.push({ message: notification.message, read: false});
        });

      this.model.get('/data.json').subscribe(data => {
        this.data = data;
        this.tagService.initialize(this.data.tags);

        //At the beginning to not have empty page
        this.searchText = 'chris';
        this.searchContacts(this.searchText);
      });
    }

    unreadNotificationCount(){
      return this.notifications.filter(notice => notice.read == false).length;
    }

    @HostListener("window:resize", ["$event"])
    onResize(event){
      this.setTargetListPosition();
    }

    onScroll(event) {
      this.tagsTargetContact = null;
    }

    searchContacts(text) {
      this.matchedContacts = this.data.contacts.filter((contact) => {
        let subParts = text.split(' ');
        let matches = false;
        subParts.forEach(part => {
          let lPart = part.toLowerCase();
          let ts = this.tagService;
          if(contact.firstName.toLowerCase().indexOf(lPart) >= 0 || 
              contact.lastName.toLowerCase().indexOf(lPart) >= 0 || 
                contact.companyName.toLowerCase().indexOf(lPart) >= 0 ||
                  contact.tags.filter(t => ts.get(t) ? ts.get(t).name.toLowerCase().indexOf(lPart) >= 0 : false).length > 0) {
            matches = true;
          }
        });
        if(matches) return contact;
      });
    }

    onTagsTargetChange(target) {
      this.tagsTargetButton = target.targetButton;
      this.tagsTargetContact = target.contact;
      this.setTargetListPosition();
    }

    onTagListClosed(contact) {
      this.tagsTargetContact = null;
      this.tagsTargetContact = null;
    }

    setTargetListPosition() {
      if(this.tagsTargetContact && this.tagsTargetButton) {
        let targetBtnRect = this.tagsTargetButton.elementRef.nativeElement.getBoundingClientRect();
        this.tagListComponent.setPosition(targetBtnRect.bottom, targetBtnRect.left + targetBtnRect.width);
      }
    }

    onTextChange(text) {
      if(text)
        this.searchContacts(text);
      else{
        this.matchedContacts = [];
      }

      this.tagsTargetContact = null;
      if(this.matchedContacts.indexOf(this.selectedContact) < 0)
        this.selectedContact = null;
    }

    onTagsChange(tags) {
      this.data.tags = tags;
    }

    onContactSelected(contact) {
      this.selectedContact = contact;
    }
}
