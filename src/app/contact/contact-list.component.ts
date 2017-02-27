import { Component, Renderer,
          ViewEncapsulation,
          Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../shared/model/contact.model';
import { TagService } from '../shared/tag.service';

@Component({
  selector: 'contact-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent {
    @Input('data') 
    public contacts: Contact[];
    
    @Output() 
    public contactsChange: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
    
    @Output('tagsTarget')
    public tagsTargetChange: EventEmitter<any> = new EventEmitter<any>();

    @Output('contactSelect')
    public contactSelected: EventEmitter<Contact> = new EventEmitter<Contact>();
    
    @Input('selected')
    public selectedContact: Contact;

    constructor(public tagService: TagService) { }

    public onTagsClick(contact, tagBtn) {
      this.tagsTargetChange.emit({ targetButton: tagBtn, contact: contact });
    }

    public onContactClick(contact) {
      this.selectedContact = contact;
      this.contactSelected.emit(contact);
    }
}
