import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  public listChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  public ingredientSelected: Subject<number> = new Subject<number>();

  private ingredients: Ingredient[] = [];

  constructor() {
    this.addIngredient(new Ingredient(null, 'Apples', 5));
    this.addIngredient(new Ingredient(null, 'Tomatoes', 10));
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): Ingredient {
    ingredient.id = this.ingredients.length;
    this.ingredients.push(ingredient);

    this.listChanged.next(this.ingredients.slice());

    return { ...this.ingredients.at(-1) };
  }

  addIngredients(ingredients: Ingredient[]): void {
    ingredients.forEach((ingredient: Ingredient) => {
      this.addIngredient(ingredient);
    });
    this.listChanged.next(this.ingredients.slice());
  }

  getIngredient(id: number): Ingredient {
    return { ...this.ingredients[id] };
  }

  updateIngredient(id: number, ingredient: Ingredient): void {
    this.ingredients[id] = { ...this.getIngredient(id), ...{ name: ingredient.name, amount: ingredient.amount } };
    this.listChanged.next(this.ingredients.slice());
  }

  removeIngredient(id: number): void {
    this.ingredients.splice(id, 1);
    this.listChanged.next(this.ingredients.slice());
  }
}
