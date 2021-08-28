import { ISlotConstructor } from "../../../types/player";
import Item from "./Item";
import PlayerInventory from "./PlayerInventory";

export default class Slot {
  id: number;
  item: Item;
  count: number;
  node: cc.Node;
  playerInventory: PlayerInventory;

  constructor({ id, item, count, node, playerInventory }: ISlotConstructor) {
    this.id = id;
    this.item = item;
    this.count = count;
    this.node = node;
    this.playerInventory = playerInventory;

    this.node.on("mouseenter", () => {
      this.playerInventory.setHoverSlot(id);
    });
    this.node.on("mouseleave", () => {
      this.playerInventory.setHoverSlot(-1);
    });
  }

  updateItem(item: Item): void {
    this.item = item;
    this.node.getChildByName("Item").getComponent(cc.Sprite).spriteFrame =
      cc.assetManager
        .getBundle("iconsBundle")
        .get(`Items/${item.slug}`, cc.SpriteFrame);
  }
}
