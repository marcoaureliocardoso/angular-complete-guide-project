import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe';
import { RecipeBookService } from './recipe-book.service';

export const recipeResolver: ResolveFn<Recipe[]> = (/* route, state */): Observable<Recipe[]> | Recipe[] => {
  const recipes = inject(RecipeBookService).getRecipes();
  if (recipes.length > 0) {
    return recipes;
  }
  return inject(DataStorageService).fetchRecipes();
};
