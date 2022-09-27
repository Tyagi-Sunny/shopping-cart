import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  collapsed = true;
  constructor(private dataStorageService: DataStorageService) {}

  @Output() content = new EventEmitter<string>();

  onSelect(choice: string) {
    this.content.emit(choice);
  }
  saveData() {
    this.dataStorageService.storeRecipes();
  }
  fetchData() {
    this.dataStorageService.loadRecipes();
  }
}
