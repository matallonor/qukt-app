import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Recipe } from "../models/recipe";

@Injectable()
export class RecipeProvider {

  recipesUrl: string;

  constructor(public http: HttpClient) {
    this.recipesUrl = `${environment.apiUrl}recipes/`;
  }

  getRecipes(filterText: string = null): Observable<Recipe[]> {
    let url = `${this.recipesUrl}`;
    if (filterText) {
      url += `?filterText=${filterText}`;
    }
    return this.http.get<Recipe[]>(url)
      .pipe(
        map(response => this.extractRecipes(response)),
        catchError(this.handleError)
      );
  }

  getRecipe(recipeId: string): Observable<Recipe> {
    const url = `${this.recipesUrl}/${recipeId}`;

    return this.http.get<Recipe>(url)
      .pipe(
        map(response => new Recipe().fromJSON(response)),
        // catchError(this.handleError('getAllusers', new User()))
      );
  }

  addFavRecipe(recipeId: string): Observable<Recipe> {
    const url = `${this.recipesUrl}/${recipeId}/add-favorite`;

    return this.http.post<Recipe>(url, null)
      .pipe(
        map(response => new Recipe().fromJSON(response)),
        catchError(this.handleError)
      );
  }

  private extractRecipes(json: any): Recipe[] {
    const recipes = new Array<Recipe>();
    for (const recipe of json) {
      recipes.push(new Recipe().fromJSON(recipe));
    }
    return recipes;
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error('handleError launched', errMsg);
    return Observable.throw(error);
  }
}
