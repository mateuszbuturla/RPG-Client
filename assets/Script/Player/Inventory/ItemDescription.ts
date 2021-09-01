import MouseManager from "../../Manager/MouseManager";
import Item from "./Item";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemDescription extends cc.Component {
  itemName: cc.Node;
  description: cc.Node;

  mouseManager: MouseManager;

  start(): void {
    this.itemName = this.node.getChildByName("ItemName");
    this.description = this.node.getChildByName("Description");
    this.mouseManager = cc.find("UI").getComponent(MouseManager);
  }

  setItemDescription(item: Item): void {
    if (item) {
      this.itemName.getComponent(cc.RichText).string = item.name;
      // prettier-ignore
      this.description.getComponent(cc.RichText).string = `<color=#ffffff>${item.description}</color> ${item.health ? "\nŻycie: " + item.health : ""} ${item.mana ? "\nMana: " + item.mana : ""} ${item.healthRegeneration? "\nRegeneracja życia: " + item.healthRegeneration: ""} ${item.manaRegeneration? "\nRegeneracja many: " + item.manaRegeneration : ""      } ${item.strength ? "\nSiła: " + item.strength : ""} ${item.intelligence ? "\nInteligencja: " + item.intelligence : ""} ${item.dexterity ? "\nZwinność: " + item.dexterity : ""} 
      `;
    }
  }

  changeDescriptionActiveStatus(status: boolean): void {
    this.itemName.active = status;
    this.description.active = status;
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
