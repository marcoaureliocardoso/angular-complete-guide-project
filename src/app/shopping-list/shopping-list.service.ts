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
  private nextId: number = 0;

  constructor() {
    this.addIngredient(new Ingredient(null, 'Apples', 5));
    this.addIngredient(new Ingredient(null, 'Tomatoes', 10));
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): Ingredient {
    ingredient.id = this.nextId;
    this.nextId++;

    this.ingredients.push(ingredient);

    this.listChanged.next(this.getIngredients());

    return this.getIngredient(ingredient.id);
  }

  addIngredients(ingredients: Ingredient[]): void {
    ingredients.forEach((ingredient: Ingredient) => {
      this.addIngredient(ingredient);
    });
    this.listChanged.next(this.getIngredients());
  }

  getIngredient(id: number): Ingredient | null {
    const foundIngredient = this.ingredients.find((ingredient) => ingredient.id === id);

    if (!foundIngredient) {
      return null;
    }

    return new Ingredient(id, foundIngredient.name, foundIngredient.amount);
  }

  updateIngredient(id: number, updatedIngredient: Ingredient): Ingredient {
    const currentIndex = this.ingredients.findIndex((ingredient) => ingredient.id === id);

    updatedIngredient.id = id;

    this.ingredients[currentIndex] = updatedIngredient;

    this.listChanged.next(this.getIngredients());

    return this.getIngredient(id);
  }

  removeIngredient(id: number): void {
    const currentIndex = this.ingredients.findIndex((ingredient) => ingredient.id === id);

    this.ingredients.splice(currentIndex, 1);

    this.listChanged.next(this.getIngredients());
  }
}
