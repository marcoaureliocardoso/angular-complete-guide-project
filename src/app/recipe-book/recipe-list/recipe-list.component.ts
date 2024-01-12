import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe';
import { RecipeBookService } from '../recipe-book.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[] = [];
  private subjectSubscription: Subscription = null;

  constructor(private recipeBookService: RecipeBookService) {}

  ngOnInit(): void {
    this.recipes = this.recipeBookService.getRecipes();
    this.subjectSubscription = this.recipeBookService.bookChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy(): void {
    this.subjectSubscription.unsubscribe();
  }
}
