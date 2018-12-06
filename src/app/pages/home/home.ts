import { Component } from '@angular/core';
import { RecipeProvider } from "app/shared/providers/recipe.provider";
import {LoadingController, NavController, Platform} from "ionic-angular";
import { RecipesList } from "app/pages/recipes-list/recipes-list";
import {TranslateService} from "@ngx-translate/core";
import {Recipe} from "app/shared/models/recipe";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private input: string = '';
  private loading: boolean;
  private recipes: Array<Recipe>;
  private isBrowser: boolean;

  constructor(
    private recipesProvider: RecipeProvider,
    private navCtrl: NavController,
    private translateService: TranslateService,
    private loader: LoadingController,
    private platform: Platform
  ) { }

  private async search() {
    this.loading = true;
    const loader = await this.presentLoading();
    setTimeout(() => {
      this.recipesProvider.getRecipes(this.input).subscribe(
        recipes => {
          if (this.platform.is('core') && this.platform.width() > 991) { // If we are on desktop we just load recipes into the template
            this.recipes = recipes;
            loader.dismissAll();
            this.loading = false;
          } else { // otherwise we navigate to the recipes-list page
            this.navCtrl.push(RecipesList, { recipes });
          }
        }, error => {
          console.log('ERROR RETRIEVING RECIPES: ', JSON.stringify(error));
          this.navCtrl.push(HomePage);
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
