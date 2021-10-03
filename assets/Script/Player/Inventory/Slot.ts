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
    if (item) {
      this.node.getChildByName("Item").getComponent(cc.Sprite).spriteFrame =
        cc.assetManager
          .getBundle("iconsBundle")
          .get(`Items/${item.slug}`, cc.SpriteFrame);
      if (item.stackable) {
        this.node.getChildByName("Count").active = true;
        this.node
          .getChildByName("Count")
          .getComponent(cc.Label).string = `${this.count}`;
      } else {
        this.node.getChildByName("Count").active = false;
      }
    } else {
      this.node.getChildByName("Item").getComponent(cc.Sprite).spriteFrame =
        null;
    }
  }

  updateCount(count: number): void {
    this.count = count;
    this.node
      .getChildByName("Count")
      .getComponent(cc.Label).string = `${this.count}`;
  }
}
