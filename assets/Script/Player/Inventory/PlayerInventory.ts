import { ItemType } from "../../../types/player";
import PlayerMovement from "../PlayerMovement";
import DraggingItem from "./DraggingItem";
import Item from "./Item";
import ItemDescription from "./ItemDescription";
import Slot from "./Slot";

const { ccclass, property } = cc._decorator;

const tempItemDB = [
  new Item({
    id: 0,
    name: "none",
    description: "none",
    slug: "",
    type: ItemType.NONE,
  }),
  new Item({
    id: 1,
    name: "item 1",
    description: "desc item 1",
    slug: "bow",
    type: ItemType.WEAPON,
    armor: 1,
    healthRegeneration: 5,
    health: 3,
    mana: 2,
    manaRegeneration: 6,
  }),
  new Item({
    id: 2,
    name: "item 2",
    description: "desc item 2",
    slug: "bow2",
    type: ItemType.WEAPON,
    strength: 3,
    intelligence: 5,
    dexterity: 1,
  }),
  new Item({
    id: 3,
    name: "item 3",
    description: "desc item 3",
    slug: "bow3",
    type: ItemType.WEAPON,
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
  slotsCount: number = 21;

  cursorOnSlot: number = -1;
  inventoryMainPanel: cc.Node;
  inventoryPanel: cc.Node;
  inventoryIsShow: boolean = false;
  inventorySlotContainer: cc.Node;
  itemDescriptionPanel: cc.Node;
  draggingItemPanel: DraggingItem;
  draggingItem: Item;
  prevousItemSlot: number = -1;

  isLocalPlayer: boolean = false;

  start() {
    this.isLocalPlayer = this.node.getComponent(PlayerMovement).localPlayer;
    if (this.isLocalPlayer) {
      this.inventoryMainPanel = cc.find("UI/Inventory");
      this.inventoryPanel =
        this.inventoryMainPanel.getChildByName("InventoryPanel");
      this.inventorySlotContainer = this.inventoryPanel.getChildByName(
        "InventorySlotsContainer"
      );
      this.itemDescriptionPanel =
        this.inventoryMainPanel.getChildByName("ItemDescription");
      this.draggingItemPanel = this.inventoryMainPanel
        .getChildByName("DraggingItem")
        .getComponent(DraggingItem);
      this.inventoryMainPanel.active = this.inventoryIsShow;
      cc.systemEvent.on(
        cc.SystemEvent.EventType.KEY_DOWN,
        this.onKeyDown,
        this
      );
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      cc.find("UI").on(
        cc.Node.EventType.MOUSE_DOWN,
        (e: cc.Event.EventMouse) => {
          this.startDraggingItem();
        }
      );
      cc.find("UI").on(cc.Node.EventType.MOUSE_UP, (e: cc.Event.EventMouse) => {
        this.endDraggingItem();
      });
    }
    this.generateSlots();
  }

  onKeyDown(e: cc.Event.EventCustom) {}
  onKeyUp(e: cc.Event.EventCustom) {
    if (e.keyCode === cc.macro.KEY.i) this.toogleInventoryVisibility();
    if (e.keyCode === cc.macro.KEY.p) this.addItem(1);
    if (e.keyCode === cc.macro.KEY.o) this.addItem(2);
    if (e.keyCode === cc.macro.KEY.l) this.addItem(3);
    if (e.keyCode === cc.macro.KEY.m) this.startDraggingItem(2);
  }

  generateSlots(): void {
    const scene = cc.director.getScene();
    for (let x = 0; x < this.slotsCount; x++) {
      let node = null;
      if (this.isLocalPlayer) {
        if (this.inventorySlotContainer) {
          node = cc.instantiate(this.slotPrefab);
          node.name = `Slot${x}`;
          node.parent = this.inventorySlotContainer;
        } else {
          cc.error("Inventory slots panel is not defind");
        }
      }
      this.inventory = [
        ...this.inventory,
        new Slot({
          id: x,
          item: null,
          count: 0,
          node: node,
          playerInventory: this.node.getComponent(PlayerInventory),
        }),
      ];
    }
  }

  addItem(itemId: number): void {
    const findItem = tempItemDB.find((item) => item.id === itemId);

    for (let i = 0; i < this.inventory.length; i++) {
      if (this.inventory[i].item === null) {
        this.inventory[i].updateItem(findItem);
        break;
      }
    }

    console.log("No empty slot in inventory");
  }

  toogleInventoryVisibility(): void {
    this.inventoryIsShow = !this.inventoryIsShow;
    this.inventoryMainPanel.active = this.inventoryIsShow;
  }

  setHoverSlot(slotId: number): void {
    this.cursorOnSlot = slotId;
    if (slotId !== -1) {
      this.itemDescriptionPanel
        .getComponent(ItemDescription)
        .changeDescriptionActiveStatus(true);
      this.itemDescriptionPanel
        .getComponent(ItemDescription)
        .setItemDescription(this.inventory[slotId].item);
    } else {
      this.itemDescriptionPanel
        .getComponent(ItemDescription)
        .changeDescriptionActiveStatus(false);
    }
  }

  startDraggingItem(): void {
    const slot = this.cursorOnSlot;
    if (!this.draggingItem && slot !== -1) {
      this.prevousItemSlot = slot;
      this.draggingItem = this.inventory[slot].item;
      this.inventory[slot].updateItem(null);
      this.draggingItemPanel.setDraggingItem(this.draggingItem);
      this.draggingItemPanel.changeIsDraggingStatus(true);
    }
  }

  endDraggingItem(): void {
    if (this.draggingItem) {
      if (this.cursorOnSlot === -1) {
        //drop item
      } else {
        if (this.inventory[this.cursorOnSlot].item === null) {
          this.inventory[this.cursorOnSlot].updateItem(this.draggingItem);
        } else {
          this.inventory[this.prevousItemSlot].updateItem(
            this.inventory[this.cursorOnSlot].item
          );
          this.inventory[this.cursorOnSlot].updateItem(this.draggingItem);
          this.prevousItemSlot = -1;
        }
      }
      this.draggingItem = null;
      this.draggingItemPanel.changeIsDraggingStatus(false);
    }
  }

  update(): void {}
}
