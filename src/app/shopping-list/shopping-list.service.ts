import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {

  public listChanged: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() {}

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.listChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.listChanged.emit(this.ingredients.slice());
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: Ingredient): void {
    this.ingredients[index] = ingredient;
  }

  removeIngredient(index: number): void {
    this.ingredients.splice(index, 1);
  }
}
