import { Serializable } from "app/shared/models/serializable";

export class Image extends Serializable {
  fileName: string;
  url: string;
}
