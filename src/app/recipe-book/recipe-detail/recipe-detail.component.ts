import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeBookService } from '../recipe-book.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  @Input() public recipe: Recipe = null;

  constructor(private recipeBookService: RecipeBookService, private shoppingListService: ShoppingListService) {}

  addToShoppingList() {
    console.log('addToShoppingList');
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
  editRecipe() {
    console.log('editRecipe');
  }
  deleteRecipe() {
    console.log('deleteRecipe');
    this.recipeBookService.removeRecipe(this.recipeBookService.getRecipes().indexOf(this.recipe));
  }
}
