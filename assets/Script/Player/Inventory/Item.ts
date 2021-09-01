import { IItemConstructor, ItemType } from "../../../types/player";

export default class Item {
  id: number;
  name: string;
  description: string;
  slug: string;
  health?: number;
  mana?: number;
  healthRegeneration?: number;
  manaRegeneration?: number;
  armor?: number;
  strength?: number;
  intelligence?: number;
  dexterity?: number;
  type: ItemType;

  constructor({
    id,
    name,
    description,
    slug,
    healthRegeneration,
    manaRegeneration,
    armor,
    strength,
    intelligence,
    dexterity,
  }: IItemConstructor) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.slug = slug;
    this.healthRegeneration = healthRegeneration;
    this.manaRegeneration = manaRegeneration;
    this.armor = armor;
    this.strength = strength;
    this.intelligence = intelligence;
    this.dexterity = dexterity;
  }
}
