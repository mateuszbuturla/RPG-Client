import { IItemConstructor } from "../../../types/player";

export default class Item {
  id: number;
  name: string;
  description: string;
  slug: string;

  constructor({ id, name, description, slug }: IItemConstructor) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.slug = slug;
  }
}
