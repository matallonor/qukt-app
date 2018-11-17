import {Serializable} from "app/shared/models/serializable";

export class Recipe extends Serializable {
  _id: string;
  title: string;
  ingredients: string[];
  description: string;
  type?: string;
  cookTime?: number;
}
