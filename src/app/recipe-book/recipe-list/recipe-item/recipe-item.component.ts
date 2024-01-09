import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe';
import { RecipeBookService } from '../../recipe-book.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent implements OnInit {
  @Input() public recipeId: number = null;

  public recipe: Recipe = null;

  constructor(private recipeService: RecipeBookService) {}

  ngOnInit() {
    this.recipe = this.recipeService.getRecipe(this.recipeId);
  }
}
