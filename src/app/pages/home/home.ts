import { Component } from '@angular/core';
import { RecipeProvider } from "app/shared/providers/recipe.provider";
import {LoadingController, NavController, Platform} from "ionic-angular";
import { RecipesList } from "app/pages/recipes-list/recipes-list";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private input: string = '';
  private loading: boolean;
  private animationSrc: string;

  constructor(
    private recipesProvider: RecipeProvider,
    private navCtrl: NavController,
    private translateService: TranslateService,
    private loader: LoadingController
  ) { }

  private search() {
    this.loading = true;
    this.presentLoading();
    setTimeout(() => {
      this.recipesProvider.getRecipes(this.input).subscribe(
        recipes => {
          if (recipes) {
            this.navCtrl.push(HomePage);
          }
          this.navCtrl.push(RecipesList, { recipes });
          this.loading = false;
        }, error => {
          console.log('ERROR RETRIEVING RECIPES: ', JSON.stringify(error));
          this.navCtrl.push(HomePage);
        }
      );
    }, 2000);
  }

  presentLoading() {
    const loading = this.loader.create({
      showBackdrop: true,
      dismissOnPageChange: true,
      cssClass: 'sa',
      spinner: 'hide',
      content: `
              <div class="custom-spinner-container">
                <img width="120px" height="120px" src="assets/imgs/loading.gif" />
              </div>`
    });
    loading.present();
  }

}
