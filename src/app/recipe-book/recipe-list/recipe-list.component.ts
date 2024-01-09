import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe';
import { RecipeBookService } from '../recipe-book.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[] = [];

  constructor(private recipeBookService: RecipeBookService) {}

  ngOnInit(): void {
    this.recipes = this.recipeBookService.getRecipes();
  }
}
