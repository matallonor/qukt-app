import {Serializable} from "app/shared/models/serializable";
import {Resource} from "app/shared/models/resource";

export class Recipe extends Serializable {
  _id: string;
  title: string;
  ingredients: string[];
  description: string;
  type?: string;
  cookTime?: number;
  image: Resource;
}
