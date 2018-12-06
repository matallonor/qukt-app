import { Serializable } from "app/shared/models/serializable";

export class Resource extends Serializable {
  path: string;
  filename: string;
  uri: string;
}
