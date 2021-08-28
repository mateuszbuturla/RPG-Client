import MouseManager from "../../Manager/MouseManager";
import Item from "./Item";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemDescription extends cc.Component {
  description: cc.Node;
  isShow: boolean = false;

  mouseManager: MouseManager;

  start(): void {
    this.description = this.node.getChildByName("Description");
    this.mouseManager = cc.find("UI").getComponent(MouseManager);
  }

  setItemDescription(item: Item): void {
    this.description.getComponent(cc.RichText).string = item.description;
  }

  changeDescriptionActiveStatus(status: boolean): void {
    this.description.active = status;
    this.isShow = status;
  }

  update() {
    if (this.description) {
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
