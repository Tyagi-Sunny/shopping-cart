import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: true }) name: ElementRef;
  // @ViewChild('amountInput', { static: true }) amount: ElementRef;
  @ViewChild('f', { static: true }) slForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // add() {
  //   let newIngrdient = new Ingredient(
  //     this.name.nativeElement.value,
  //     this.amount.nativeElement.value
  //   );
  //   this.shoppingListService.addIngredient(newIngrdient);
  // }
  OnAddItem(form: NgForm) {
    // console.log(form);
    const value = form.value;
    const newIngrdient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // console.log();

      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        newIngrdient
      );
    } else this.shoppingListService.addIngredient(newIngrdient);

    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.editMode = false;
    this.slForm.reset();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }
}
