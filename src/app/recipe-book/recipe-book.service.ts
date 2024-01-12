import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeBookService {
  private recipes: Recipe[] = [
    new Recipe(
      'Carrot Cake',
      "Moist, spiced cake filled with grated carrots and nuts, raisins, or pineapple; topped with a rich cream cheese frosting, offering a perfect balance of sweet and tangy flavors.",
      'assets/carrot-cake.jpg',
      [
        new Ingredient('Vegetable Oil', 1),
        new Ingredient('Natural Yogurt', 1),
        new Ingredient('Egg', 3),
        new Ingredient('Flour', 1),
        new Ingredient('Carrot', 2),
        new Ingredient('Walnut', 2),
        new Ingredient('Butter', 1),
      ]
    ),
    new Recipe(
      'Lobster Salad with Spring Peas, Radish and Tarragon Vinaigrette',
      'Succulent lobster paired with sweet peas and crisp radishes with tarragon vinaigrette; topped with a dollop of labneh, a Middle Eastern yogurt cheese.',
      'assets/Spring-Radish-Pea-Lobster-Salad-Labneh.jpg',
      [
        new Ingredient('Serrano Pepper', 1),
        new Ingredient('Fresh Tarragon', 2),
        new Ingredient('Champagne Vinegar', 2),
        new Ingredient('Maine Lobster', 1)
      ]
    ),
  ];

  public bookChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  constructor() {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.bookChanged.next(this.recipes.slice());
  }

  getRecipe(index: number): Recipe {
    return this.recipes.slice()[index];
  }

  updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe;
    this.bookChanged.next(this.recipes.slice());
  }

  removeRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.bookChanged.next(this.recipes.slice());
  }
}
