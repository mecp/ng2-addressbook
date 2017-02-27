import { Component, Renderer, ViewEncapsulation, Input } from '@angular/core';

import { TagService } from '../shared/tag.service';
import { Contact } from '../shared/model/contact.model';

@Component({
  selector: 'contact-info',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './contact-info.component.html'
})
export class ContactInfoComponent {
    @Input() public contact: Contact;

    constructor(public tagService: TagService) {}
}
