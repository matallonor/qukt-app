import { Component } from '@angular/core';
import { Recipe } from 'app/shared/models/recipe';
import { Recipes } from 'app/shared/mocks/recipes';
import { RecipeProvider } from "app/shared/providers/recipe.provider";
import {environment} from "app/shared/environments/environment";
import {NavController, NavParams} from "ionic-angular";
import {RecipeDetail} from "app/pages/recipe-detail/recipe-detail";
import {HomePage} from "app/pages/home/home";

@Component({
  selector: 'page-recipes-list',
  templateUrl: 'recipes-list.html'
})
export class RecipesList {

  private recipes: Array<Recipe>;
  private resourcesUrl: string;

  constructor(
    private recipesProvider: RecipeProvider,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
    this.recipes = Recipes;
    this.resourcesUrl = environment.resourcesUrl;
  }

  ionViewDidLoad() {
    this.recipes = this.navParams.get('recipes');
  }

  openRecipe(recipe: Recipe) {
    this.navCtrl.push(RecipeDetail, { recipe: recipe });
  }

  goHome() {
    this.navCtrl.push(HomePage);
  }

}
