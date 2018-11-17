import { Component } from '@angular/core';
import { Recipe } from 'app/shared/models/recipe';
import { environment } from "app/shared/environments/environment";
import {TranslateService} from "@ngx-translate/core";
import {NavParams} from "ionic-angular";

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
    private navParams: NavParams
  ) {
    this.recipe = this.navParams.get('recipe');
    this.description = this.recipe.description.split('\n');
    this.description.forEach((desc) => { console.log(desc.charCodeAt(0)) } );
    this.description.pop();
    this.resourcesUrl = environment.resourcesUrl;
  }
}
