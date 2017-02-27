import { Directive, OnInit, ElementRef, AfterViewChecked } from '@angular/core';
declare let componentHandler: any;

@Directive({
  selector: '[mdl], [mdlUpgrade], [mdl-upgrade]'
})
export class MdlDirective implements AfterViewChecked {
  
  constructor(public elem: ElementRef) {}

  ngAfterViewChecked() {
    if (componentHandler){
        //componentHandler.upgradeElements(this.elem.nativeElement);
        componentHandler.upgradeAllRegistered();
    }
  }
}