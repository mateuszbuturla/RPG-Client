import MouseManager from "../../Manager/MouseManager";
import Item from "./Item";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DraggingItem extends cc.Component {
  item: cc.Node;

  mouseManager: MouseManager;

  start(): void {
    this.item = this.node.getChildByName("Item");
    this.mouseManager = cc.find("UI").getComponent(MouseManager);
  }

  setDraggingItem(item: Item): void {
    if (item) {
      this.item.getComponent(cc.Sprite).spriteFrame = cc.assetManager
        .getBundle("iconsBundle")
        .get(`Items/${item.slug}`, cc.SpriteFrame);
    } else {
      this.item.getComponent(cc.Sprite).spriteFrame = null;
    }
  }

  changeIsDraggingStatus(status: boolean): void {
    this.item.active = status;
  }

  update() {
    if (this.item) {
      this.node.setPosition(
        new cc.Vec3(
          this.mouseManager.mousePosition.x,
          this.mouseManager.mousePosition.y,
          0
        )
      );
    }
  }
}
