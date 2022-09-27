import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  recipes: Recipe[];
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    this.recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://shopping-cart-dd5f1-default-rtdb.firebaseio.com/recipes.json',
        this.recipes
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  loadRecipes() {
    this.http
      .get<Recipe[]>(
        'https://shopping-cart-dd5f1-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        })
      )
      .subscribe((recipes) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      });
  }
}
