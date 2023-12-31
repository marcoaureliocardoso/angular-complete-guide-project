import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'assets/carrot-cake.jpg'),
    new Recipe('A Test Recipe 2', 'This is simply a test 2', 'assets/Spring-Radish-Pea-Lobster-Salad-Labneh.jpg'),
  ];

  @Output() recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  selectRecipe(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}
