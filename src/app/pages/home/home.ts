import { Component } from '@angular/core';
import { Recipe } from 'app/shared/models/recipe';
import { Recipes } from 'app/shared/mocks/recipes';
import { RecipeProvider } from "app/shared/providers/recipe.provider";
import {environment} from "app/shared/environments/environment";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private recipes: Array<Recipe>;
  private resourcesUrl: string;

  constructor(private recipesProvider: RecipeProvider) {
    this.recipes = Recipes;
    this.resourcesUrl = environment.resourcesUrl;
  }

  ionViewDidLoad() {
    this.getRecipes();
  }

  openRecipe(recipe: Recipe) {
    console.log('recipe clicked:', recipe);
  }

  private getRecipes() {
    this.recipesProvider.getRecipes().subscribe(
      recipes => {
        this.recipes = recipes;
      }, error => {
        console.log('ERROR RETRIEVING RECIPES: ', JSON.stringify(error));
      }
    )
  }
}
