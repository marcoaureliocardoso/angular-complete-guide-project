import { Component, OnInit } from '@angular/core';
import { RecipeBookService } from '../recipe-book.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  public recipeId: number = null;
  public editMode: boolean = false;

  public recipe: Recipe = null;

  public newRecipe: Recipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: [],
  };

  constructor(private recipeBookService: RecipeBookService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.recipeId = this.recipeId = Number(params['id']);
      this.editMode = params['id'] != null;
      if (!this.editMode) {
        return;
      }
      this.recipe = this.recipeBookService.getRecipe(this.recipeId);

      this.newRecipe.name = this.recipe.name;
      this.newRecipe.description = this.recipe.description;
      this.newRecipe.imagePath = this.recipe.imagePath;
      this.newRecipe.ingredients = this.recipe.ingredients;
    });
  }

  saveRecipe() {
    if (!this.editMode) {
      this.recipeBookService.addRecipe(this.newRecipe);
      return;
    }

    this.recipeBookService.updateRecipe(this.recipeId, this.newRecipe);
  }
}
