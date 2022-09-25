import { Component } from '@angular/core';
import { ShoppingListService } from './shopping-list/shoppinglist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'shopping-angulra';
  recipeOrShoppingList: boolean;

  constructor(private shoppingListService: ShoppingListService) {}
  show(type: string) {
    this.recipeOrShoppingList = type === 'recipe' ? true : false;
    this.shoppingListService.showList.subscribe(() => {
      this.recipeOrShoppingList = false;
    });
  }
}
