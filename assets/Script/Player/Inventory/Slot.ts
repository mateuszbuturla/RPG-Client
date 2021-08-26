import { ISlotConstructor } from "../../../types/player";
import Item from "./Item";

export default class Slot {
  id: number;
  item: Item;
  count: number;

  constructor({ id, item, count }: ISlotConstructor) {
    this.id = id;
    this.item = item;
    this.count = count;
  }
}
