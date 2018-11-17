import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Recipe } from 'app/shared/models/recipe';
import { Recipes } from 'app/shared/mocks/recipes';
import { RecipeProvider } from "app/shared/providers/recipe.provider";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  recipes: Array<Recipe>;

  constructor(private recipesProvider: RecipeProvider) {
    this.recipes = Recipes;
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
