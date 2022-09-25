import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropDown]',
})
export class DropDownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') onCLick(event: Event) {
    this.isOpen = !this.isOpen;
  }
  constructor(private element: ElementRef, private rendere: Renderer2) {}
}
