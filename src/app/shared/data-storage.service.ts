import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipe-book/recipe';
import { RecipeBookService } from '../recipe-book/recipe-book.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeBookService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    const nextId = this.recipeService.nextRecipeId;
    this.http.put('https://ng-complete-guide-1447e-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe((/* response */) => {
      // console.log(response);
    });
    this.http.put('https://ng-complete-guide-1447e-default-rtdb.firebaseio.com/recipesNextId.json', nextId).subscribe((/* response */) => {
      // console.log(response);
    });
  }

  fetchRecipes() {
    this.http.get<number>('https://ng-complete-guide-1447e-default-rtdb.firebaseio.com/recipesNextId.json').subscribe((nextId: number) => {
      this.recipeService.nextRecipeId = nextId;
    });
    return this.http.get<Recipe[]>('https://ng-complete-guide-1447e-default-rtdb.firebaseio.com/recipes.json').pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }),
      tap((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
