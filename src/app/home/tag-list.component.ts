import { Component, Renderer, ViewEncapsulation, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Contact } from '../shared/model/contact.model';
import { Tag } from '../shared/model/tag.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'tag-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tag-list.component.html'
})
export class TagListComponent {
    @Input('target') 
    public target: Contact;
    @Output('tagListClose') 
    public tagListClose: EventEmitter<Contact> = new EventEmitter<Contact>();

    @Input('tags') 
    public tags: Array<Tag>;
    @Output('tagChange') 
    public tagChange: EventEmitter<Tag> = new EventEmitter<Tag>();

    public newTag: string;
    public editing: boolean;
    public tagBeingEdited: Tag;
    public editTagValue: string;

    @ViewChild('tagListBox')
    public tagListBox: any;

    constructor(public renderer: Renderer, public notificationService: NotificationService) {
        
    }

    onTagEnter(newTag: string) {
        if(newTag && newTag.trim().length > 0) {
            let newTagObj = { id: '' + new Date().getTime(), name: newTag };
            this.tags.push(newTagObj);
            this.newTag = "";
            
            this.notificationService.publish("New Tag: " + newTag);

            this.tagChange.emit(newTagObj);
        }
    }

    onTagTaggle(state, tag) {
        if(state)
            this.target.tags.push(tag.id);
        else
            this.target.tags.splice(this.target.tags.indexOf(tag.id), 1);
    }

    onTagRemove(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
        this.tagChange.emit(tag);
    }

    onTagEdit(tag) {
        if(!this.editing || (this.editing && tag !== this.tagBeingEdited)) {
            this.editing = true;
            this.tagBeingEdited = tag;
            this.editTagValue = tag.name;
        } else if(this.editing && tag === this.tagBeingEdited) {
            this.tags[this.tags.indexOf(tag)].name = this.editTagValue;
            
            this.editing = false;
            this.tagBeingEdited = null;
            this.editTagValue = "";
            
            this.tagChange.emit(tag);
        }
    }

    setPosition(top, right) {
        this.renderer.setElementStyle(this.tagListBox.nativeElement, 'display', 'inherit');
        let tagListWidth = this.tagListBox.nativeElement.clientWidth;
        this.renderer.setElementStyle(this.tagListBox.nativeElement, 'top', top + 'px');
        this.renderer.setElementStyle(this.tagListBox.nativeElement, 'left', right - tagListWidth + 'px');
    }

    onClose() {
        this.renderer.setElementStyle(this.tagListBox.nativeElement, 'display', 'none');
        
        this.target = null;
        this.tagListClose.emit(null);
    }
}