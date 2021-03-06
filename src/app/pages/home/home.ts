import { Component } from '@angular/core';
import { RecipeProvider } from "app/shared/providers/recipe.provider";
import { LoadingController, NavController } from "ionic-angular";
import { RecipesList } from "app/pages/recipes-list/recipes-list";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private input: string = '';
  private loading: boolean;

  constructor(
    private recipesProvider: RecipeProvider,
    private navCtrl: NavController,
    private translateService: TranslateService,
    private loader: LoadingController
  ) { }

  private async search() {
    this.loading = true;
    const loader = await this.presentLoading();
    setTimeout(() => {
      this.recipesProvider.getRecipes(this.input).subscribe(
        recipes => {
          loader.dismissAll();
          this.navCtrl.push(RecipesList, { recipes });
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
