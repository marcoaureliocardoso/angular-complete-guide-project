import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { RecipeBookService } from '../recipe-book.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  public recipeId: number = null;
  public editMode: boolean = false;

  public recipeForm: FormGroup = null;

  public get ingredientCtrlGrps() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(private recipeBookService: RecipeBookService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = this.recipeId = Number(params['id']);
      this.editMode = params['id'] != null;
      this.initReactiveForm();
    });
  }

  private initReactiveForm(): void {
    let formRecipe: Recipe = null;
    const formRecipeArray = new FormArray([]);

    if (this.editMode) {
      formRecipe = this.recipeBookService.getRecipe(this.recipeId);

      if (formRecipe.ingredients) {
        for (const ingredient of formRecipe.ingredients) {
          formRecipeArray.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          );
        }
      }
    } else {
      formRecipe = {
        id: null,
        name: '',
        imagePath: '',
        description: '',
        ingredients: [],
      };
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(formRecipe.name, Validators.required),
      imagePath: new FormControl(formRecipe.imagePath, Validators.required),
      description: new FormControl(formRecipe.description, Validators.required),
      ingredients: formRecipeArray,
    });
  }

  addIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    );
  }

  deleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onSubmit(): void {
    // const newRecipe: Recipe = new Recipe(this.recipeId, this.recipeForm.value.name, this.recipeForm.value.description, this.recipeForm.value.imagePath, this.recipeForm.value.ingredients);

    if (this.editMode) {
      this.recipeBookService.updateRecipe(this.recipeId, this.recipeForm.value);
    } else {
      this.recipeBookService.addRecipe(this.recipeForm.value);
    }

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public isTouchedInvalid(fieldName: string, index: number = null): string {
    let isTouched: boolean = null;
    let isInvalid: boolean = null;
    let formGroup: FormGroup = null;

    if (index == null) {
      formGroup = this.recipeForm;
    } else {
      formGroup = this.ingredientCtrlGrps[index] as FormGroup;
    }

    isTouched = formGroup.get(fieldName).touched;
    isInvalid = formGroup.get(fieldName).invalid;

    return isTouched && isInvalid ? 'is-invalid' : '';
  }
}
