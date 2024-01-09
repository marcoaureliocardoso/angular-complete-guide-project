import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeBookService } from '../recipe-book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  public id: number = null;
  public recipe: Recipe = null;

  constructor(private recipeBookService: RecipeBookService, private shoppingListService: ShoppingListService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = Number(params['id']);
      this.recipe = this.recipeBookService.getRecipe(Number(params['id']));
    });
  }

  addToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
  deleteRecipe() {
    this.recipeBookService.removeRecipe(this.recipeBookService.getRecipes().indexOf(this.recipe));
  }
}
