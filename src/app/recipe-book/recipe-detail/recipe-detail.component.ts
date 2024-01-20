import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeBookService } from '../recipe-book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  public id: number = null;
  public recipe: Recipe = null;

  constructor(private recipeBookService: RecipeBookService, private shoppingListService: ShoppingListService, private route: ActivatedRoute, private router: Router) {}

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
    this.recipeBookService.removeRecipe(this.recipe.id);
    this.router.navigate(['../']);
  }
}
