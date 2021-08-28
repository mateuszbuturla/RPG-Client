import Item from "../../../Script/Player/Inventory/Item";
import PlayerInventory from "../../../Script/Player/Inventory/PlayerInventory";

export interface IItemConstructor {
  id: number;
  name: string;
  description: string;
  slug: string;
}

export interface ISlotConstructor {
  id: number;
  item: Item;
  count: number;
  node: cc.Node;
  playerInventory: PlayerInventory;
}
