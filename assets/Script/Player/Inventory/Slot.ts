import { ISlotConstructor } from "../../../types/player";
import Item from "./Item";

export default class Slot {
  id: number;
  item: Item;
  count: number;
  node: cc.Node;

  constructor({ id, item, count, node }: ISlotConstructor) {
    this.id = id;
    this.item = item;
    this.count = count;
    this.node = node;
  }

  updateItem(item: Item): void {
    this.item = item;
    this.node.getChildByName("Item").getComponent(cc.Sprite).spriteFrame =
      cc.assetManager
        .getBundle("iconsBundle")
        .get(`Items/${item.slug}`, cc.SpriteFrame);
  }
}
