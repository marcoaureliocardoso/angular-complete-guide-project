import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css',
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput') public nameInputRef: ElementRef;
  @ViewChild('amountInput') public amountInputRef: ElementRef;
  @Output() public itemCreated: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  createItem() {
    const name: string = this.nameInputRef.nativeElement.value;
    const amount: number = this.amountInputRef.nativeElement.value;
    this.itemCreated.emit(new Ingredient(name, amount));
  }
}
