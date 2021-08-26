import Item from "../../../Script/Player/Inventory/Item";

export interface IItemConstructor {
  id: number;
  name: string;
  description: string;
}

export interface ISlotConstructor {
  id: number;
  item: Item;
  count: number;
}
