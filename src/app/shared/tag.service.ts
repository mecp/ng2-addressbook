import { Injectable } from '@angular/core';
import { Tag } from './model/tag.model'

@Injectable()
export class TagService {
    private tags: Array<Tag>;
    
    initialize(tags: Array<Tag>) {
        this.tags = tags;
    }

    get(tagId: string) : Tag {
        if(this.tags) {
            let res = this.tags.filter(tag => tag.id === tagId);
            return  res.length > 0 ? res[0] : null;
        } else 
            return null;
    }
}