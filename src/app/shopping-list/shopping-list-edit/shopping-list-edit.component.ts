import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css',
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput') public nameInputRef: ElementRef;
  @ViewChild('amountInput') public amountInputRef: ElementRef;
  
  constructor(private shoppingListService: ShoppingListService) {}

  createItem() {
    const name: string = this.nameInputRef.nativeElement.value;
    const amount: number = this.amountInputRef.nativeElement.value;
    const newIngredient: Ingredient = new Ingredient(name, amount);

    this.shoppingListService.addIngredient(newIngredient);
  }
}
