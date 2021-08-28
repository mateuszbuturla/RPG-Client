import PlayerMovement from "../PlayerMovement";
import Item from "./Item";
import Slot from "./Slot";

const { ccclass, property } = cc._decorator;

const tempItemDB = [
  new Item({
    id: 0,
    name: "none",
    description: "none",
  }),
  new Item({
    id: 1,
    name: "item 1",
    description: "desc item 1",
  }),
  new Item({
    id: 2,
    name: "item 2",
    description: "desc item 2",
  }),
  new Item({
    id: 3,
    name: "item 3",
    description: "desc item 3",
  }),
];

@ccclass
export default class PlayerInventory extends cc.Component {
  @property(Slot)
  inventory: Slot[] = [];
  @property()
  slots: cc.Node[] = [];
  @property(cc.Prefab)
  slotPrefab: cc.Prefab;
  @property()
  slotsCountX: number = 4;
  @property()
  slotsCountY: number = 4;

  inventoryPanel: cc.Node;
  inventoryIsShow: boolean = false;
  inventorySlotContainer: cc.Node;

  isLocalPlayer: boolean = false;

  start() {
    this.isLocalPlayer = this.node.getComponent(PlayerMovement).localPlayer;
    if (this.isLocalPlayer) {
      this.inventoryPanel = cc.find("UI/Inventory");
      this.inventorySlotContainer = cc.find(
        "UI/Inventory/InventorySlotsContainer"
      );
      this.inventoryPanel.active = this.inventoryIsShow;
      cc.systemEvent.on(
        cc.SystemEvent.EventType.KEY_DOWN,
        this.onKeyDown,
        this
      );
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    this.generateSlots();
    setInterval(() => {
      this.addItem(1);
    }, 200);
  }

  onKeyDown(e: cc.Event.EventCustom) {}
  onKeyUp(e: cc.Event.EventCustom) {
    if (e.keyCode === cc.macro.KEY.i) this.toogleInventoryVisibility();
  }

  generateSlots(): void {
    let slotId = 0;
    const scene = cc.director.getScene();
    for (let x = 0; x < this.slotsCountX; x++) {
      for (let y = 0; y < this.slotsCountY; y++) {
        if (this.isLocalPlayer) {
          if (this.inventorySlotContainer) {
            const node = cc.instantiate(this.slotPrefab);
            node.parent = this.inventorySlotContainer;
          } else {
            cc.error("Inventory slots panel is not defind");
          }
        }
        this.inventory = [
          ...this.inventory,
          new Slot({
            id: slotId,
            item: tempItemDB[0],
            count: 0,
          }),
        ];
        slotId++;
      }
    }
  }

  addItem(itemId: number): void {
    const findItem = tempItemDB.find((item) => item.id === itemId);

    for (let i = 0; i < this.inventory.length; i++) {
      if (this.inventory[i].item.id === 0) {
        this.inventory[i].item = findItem;
        break;
      }
    }

    console.log("No empty slot in inventory");
  }

  toogleInventoryVisibility(): void {
    this.inventoryIsShow = !this.inventoryIsShow;
    this.inventoryPanel.active = this.inventoryIsShow;
  }

  update(): void {
    // console.log(this.inventory.map((slot) => slot.item.name));
  }
}
