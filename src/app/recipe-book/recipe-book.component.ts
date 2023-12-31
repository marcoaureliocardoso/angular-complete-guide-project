import { Component } from '@angular/core';
import { Recipe } from './recipe';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrl: './recipe-book.component.css',
})
export class RecipeBookComponent {
  public selectedRecipe: Recipe = null;

  onRecipeSelected(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }
}
