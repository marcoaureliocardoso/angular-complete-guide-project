import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css',
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('frm') public ingredientForm: NgForm;

  public selectedIngredientId: number = null;
  public selectedIngredient: Ingredient = null;

  private subjectSubscription: Subscription = null;
  public editMode: boolean = false;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subjectSubscription = this.shoppingListService.ingredientSelected.subscribe((id: number) => {
      this.selectedIngredientId = id;
      this.editMode = true;
      this.selectedIngredient = this.shoppingListService.getIngredient(id);
      this.ingredientForm.setValue({
        name: this.selectedIngredient.name,
        amount: this.selectedIngredient.amount,
      });
    });
  }

  ngOnDestroy(): void {
    this.subjectSubscription.unsubscribe();
  }

  submitIngredient(form: NgForm) {
    const newIngredient = new Ingredient(null, form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.selectedIngredientId, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.clearForm();
  }

  deleteIngredient() {
    this.shoppingListService.removeIngredient(this.selectedIngredient.id);
    this.clearForm();
  }

  clearForm() {
    this.ingredientForm.reset();
    this.editMode = false;
  }
}
