import Item from "../../../Script/Player/Inventory/Item";
import PlayerInventory from "../../../Script/Player/Inventory/PlayerInventory";

export enum ItemType {
  NONE,
  HEAD,
  BODY,
  GLOVES,
  PANTS,
  SHOES,
  WEAPON,
  OFFHAND,
  RING,
  AMULET,
}
export interface IItemConstructor {
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
}

export interface ISlotConstructor {
  id: number;
  item: Item;
  count: number;
  node: cc.Node;
  playerInventory: PlayerInventory;
}
