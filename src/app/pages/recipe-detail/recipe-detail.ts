import { Component } from '@angular/core';
import { Recipe } from 'app/shared/models/recipe';
import { environment } from "app/shared/environments/environment";
import {TranslateService} from "@ngx-translate/core";
import {NavController, NavParams} from "ionic-angular";
import {HomePage} from "app/pages/home/home";

@Component({
  selector: 'page-recipe-detail',
  templateUrl: 'recipe-detail.html'
})
export class RecipeDetail {
  private recipe: Recipe;
  private resourcesUrl: string;
  private description: string[];

  constructor(
    private translateService: TranslateService,
    private navParams: NavParams,
    private navCtrl: NavController
  ) {
    this.recipe = this.navParams.get('recipe');
    this.resourcesUrl = environment.resourcesUrl;
  }

  private goHome() {
    this.navCtrl.push(HomePage);
  }
}
