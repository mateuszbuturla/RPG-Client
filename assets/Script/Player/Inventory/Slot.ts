import { ISlotConstructor } from "../../../types/player";
import Item from "./Item";
import PlayerInventory from "./PlayerInventory";

export default class Slot {
  id: number;
  item: Item;
  node: cc.Node;
  playerInventory: PlayerInventory;

  constructor({ id, item, node, playerInventory }: ISlotConstructor) {
    this.id = id;
    this.item = item;
    this.node = node;
    this.playerInventory = playerInventory;

    this.node.on("mouseenter", () => {
      this.playerInventory.setHoverSlot(id);
    });
    this.node.on("mouseleave", () => {
      this.playerInventory.setHoverSlot(-1);
    });

    this.node.getChildByName("Count").active = false;
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
          .getComponent(cc.Label).string = `${this.item.count}`;
      } else {
        this.node.getChildByName("Count").active = false;
        this.node
          .getChildByName("Count")
          .getComponent(cc.Label).string = `${this.item.count}`;
      }
    } else {
      this.node.getChildByName("Item").getComponent(cc.Sprite).spriteFrame =
        null;
    }
  }

  updateCount(count: number): void {
    if (this.item) {
      this.item.count = this.item.count + count;
      this.node
        .getChildByName("Count")
        .getComponent(cc.Label).string = `${this.item.count}`;
    }
  }

  hideCountLabel(): void {
    this.node.getChildByName("Count").active = false;
  }
}
