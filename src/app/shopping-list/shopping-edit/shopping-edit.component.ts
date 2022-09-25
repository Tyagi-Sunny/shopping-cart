import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: true }) name: ElementRef;
  @ViewChild('amountInput', { static: true }) amount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  add() {
    let newIngrdient = new Ingredient(
      this.name.nativeElement.value,
      this.amount.nativeElement.value
    );
    this.shoppingListService.addIngredient(newIngrdient);
  }
}
