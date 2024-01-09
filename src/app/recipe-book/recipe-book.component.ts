import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';
import { RecipeBookService } from './recipe-book.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrl: './recipe-book.component.css',
})
export class RecipeBookComponent implements OnInit {
  public selectedRecipe: Recipe = null;

  constructor(private recipesBookService: RecipeBookService) {}

  ngOnInit(): void {
    this.recipesBookService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }
}
