import { IItemConstructor } from "../../../types/player";

export default class Item {
  id: number;
  name: string;
  description: string;

  constructor({ id, name, description }: IItemConstructor) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
