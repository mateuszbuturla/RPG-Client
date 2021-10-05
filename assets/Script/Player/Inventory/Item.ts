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
  stackable: boolean;
  count: number;
  type: ItemType;

  constructor({
    id,
    name,
    description,
    slug,
    health,
    mana,
    healthRegeneration,
    manaRegeneration,
    armor,
    strength,
    intelligence,
    dexterity,
    stackable,
    count,
  }: IItemConstructor) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.slug = slug;
    this.health = health;
    this.mana = mana;
    this.healthRegeneration = healthRegeneration;
    this.manaRegeneration = manaRegeneration;
    this.armor = armor;
    this.strength = strength;
    this.intelligence = intelligence;
    this.dexterity = dexterity;
    this.stackable = stackable;
    this.count = count || 1;
  }
}
