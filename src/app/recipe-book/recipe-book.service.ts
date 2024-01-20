import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeBookService {
  public bookChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  private nextId: number = 0;

  constructor() {
    this.addRecipe(
      new Recipe(
        null,
        'Carrot Cake',
        'Moist, spiced cake filled with grated carrots and nuts, raisins, or pineapple; topped with a rich cream cheese frosting, offering a perfect balance of sweet and tangy flavors.',
        'assets/carrot-cake.jpg',
        [
          new Ingredient(null, 'Vegetable Oil', 1),
          new Ingredient(null, 'Natural Yogurt', 1),
          new Ingredient(null, 'Egg', 3),
          new Ingredient(null, 'Flour', 1),
          new Ingredient(null, 'Carrot', 2),
          new Ingredient(null, 'Walnut', 2),
          new Ingredient(null, 'Butter', 1),
        ]
      )
    );
    this.addRecipe(
      new Recipe(
        null,
        'Lobster Salad with Spring Peas, Radish and Tarragon Vinaigrette',
        'Succulent lobster paired with sweet peas and crisp radishes with tarragon vinaigrette; topped with a dollop of labneh, a Middle Eastern yogurt cheese.',
        'assets/Spring-Radish-Pea-Lobster-Salad-Labneh.jpg',
        [new Ingredient(null, 'Serrano Pepper', 1), new Ingredient(null, 'Fresh Tarragon', 2), new Ingredient(null, 'Champagne Vinegar', 2), new Ingredient(null, 'Maine Lobster', 1)]
      )
    );
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe): Recipe {
    recipe.id = this.nextId;
    this.nextId++;

    this.recipes.push(recipe);

    this.bookChanged.next(this.getRecipes());

    return this.getRecipe(recipe.id);
  }

  getRecipe(id: number): Recipe | null {
    const foundRecipe = this.recipes.find((recipe) => recipe.id === id);

    if (!foundRecipe) {
      return null;
    }

    return new Recipe(
      id,
      foundRecipe.name,
      foundRecipe.description,
      foundRecipe.imagePath,
      foundRecipe.ingredients.map((ingredient) => ({ ...ingredient }))
    );
  }

  updateRecipe(id: number, updatedRecipe: Recipe): Recipe {
    const currentIndex = this.recipes.findIndex((recipe) => recipe.id === id);

    updatedRecipe.id = id;

    this.recipes[currentIndex] = updatedRecipe;

    this.bookChanged.next(this.getRecipes());

    return this.getRecipe(id);
  }

  removeRecipe(id: number): void {
    const currentIndex = this.recipes.findIndex((recipe) => recipe.id === id);

    this.recipes.splice(currentIndex, 1);

    this.bookChanged.next(this.getRecipes());
  }
}
