import {Serializable} from "app/shared/models/serializable";
import {Image} from "app/shared/models/image";

export class Recipe extends Serializable {
  title: string;
  ingredients: string[];
  description: string[];
  type?: string;
  cookTime?: number;
  image: Image;

}
