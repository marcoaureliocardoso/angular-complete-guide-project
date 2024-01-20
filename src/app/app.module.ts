import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeListComponent } from './recipe-book/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-book/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpansiveButtonDirective } from './shared/directives/expansive-button.directive';
import { RouterLink, RouterLinkActive, RouterOutlet, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import { NoRecipeComponent } from './recipe-book/no-recipe/no-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeBookComponent,
    ExpansiveButtonDirective,
    RecipeEditComponent,
    NoRecipeComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,

    FormsModule,
    ReactiveFormsModule,

    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule { }
