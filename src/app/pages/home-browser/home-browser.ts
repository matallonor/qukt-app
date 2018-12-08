import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { RecipeProvider } from "app/shared/providers/recipe.provider";
import {Content, LoadingController, NavController, Platform, Slides} from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import { Recipe } from "app/shared/models/recipe";
import { environment } from "app/shared/environments/environment";

@Component({
  selector: 'page-home-browser',
  templateUrl: 'home-browser.html'
})
export class HomeBrowserPage {

  private input: string = '';
  private loading: boolean;
  private recipes: Array<Recipe>;
  private recipe: Recipe;
  private resourcesUrl: string;

  goToNextSlide() {
    const currentIndex = this.recipes.indexOf(this.recipe);
    if (currentIndex + 1 < this.recipes.length) {
      this.recipe = this.recipes[currentIndex + 1];
    }
  }

  goToPreviousSlide() {
    const currentIndex = this.recipes.indexOf(this.recipe);
    if (currentIndex - 1 >= 0) {
      this.recipe = this.recipes[currentIndex - 1];
    }
  }

  constructor(
    private recipesProvider: RecipeProvider,
    private navCtrl: NavController,
    private translateService: TranslateService,
    private loader: LoadingController
  ) {
    this.resourcesUrl = environment.resourcesUrl;
  }


  private async search() {
    this.loading = true;
    const loader = await this.presentLoading();
    setTimeout(() => {
      this.recipesProvider.getRecipes(this.input).subscribe(
        recipes => {
          this.recipes = recipes;
          this.recipe = this.recipes[0];
          loader.dismissAll();
          this.loading = false;
        }, error => {
          console.log('ERROR RETRIEVING RECIPES: ', JSON.stringify(error));
          this.navCtrl.push(HomeBrowserPage);
        }
      );
    }, 1000);
  }

  async presentLoading() {
    const loader = this.loader.create({
      dismissOnPageChange: true,
      spinner: 'hide',
      content: `
              <div class="custom-spinner-container">
                <img width="120px" height="120px" src="assets/imgs/loading.gif" />
              </div>`
    });
    loader.present();
    return loader;
  }

}
