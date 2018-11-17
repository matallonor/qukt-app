import { Component } from '@angular/core';
import { Recipe } from 'app/shared/models/recipe';
import { Recipes } from 'app/shared/mocks/recipes';
import { RecipeProvider } from "app/shared/providers/recipe.provider";
import {environment} from "app/shared/environments/environment";
import {NavController} from "ionic-angular";
import {RecipeDetail} from "app/pages/recipe-detail/recipe-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private recipes: Array<Recipe>;
  private resourcesUrl: string;

  constructor(
    private recipesProvider: RecipeProvider,
    private navCtrl: NavController
  ) {
    this.recipes = Recipes;
    this.resourcesUrl = environment.resourcesUrl;
  }

  ionViewDidLoad() {
    this.getRecipes();
  }

  openRecipe(recipe: Recipe) {
    this.navCtrl.push(RecipeDetail, { recipe: recipe });
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
