import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  collapsed = true;

  @Output() content = new EventEmitter<string>();

  onSelect(choice: string) {
    this.content.emit(choice);
  }
}
