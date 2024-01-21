import { Routes } from '@angular/router';

import { NoRecipeComponent } from './recipe-book/no-recipe/no-recipe.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import { recipeResolver } from './recipe-book/recipe.resolver';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipeBookComponent,
    children: [
      { path: '', component: NoRecipeComponent },
      { path: 'create', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: { recipe: recipeResolver } },
      { path: ':id/edit', component: RecipeEditComponent, resolve: { recipe: recipeResolver } },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
];
