import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe';
import { RecipeBookService } from '../../recipe-book.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() public recipe: Recipe = null;

  constructor(private recipeBookService: RecipeBookService) {}

  selectRecipe() {
    this.recipeBookService.recipeSelected.emit(this.recipe);
  }
}
