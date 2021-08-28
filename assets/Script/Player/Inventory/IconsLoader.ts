const { ccclass, property } = cc._decorator;

@ccclass
export default class IconsLoader extends cc.Component {
  @property(cc.Sprite)
  icons: cc.SpriteFrame[] = [];

  onLoad(): void {
    cc.assetManager.loadBundle("iconsBundle", (err, bundle) => {
      bundle.loadDir("Items", cc.SpriteFrame, (err, asset) => {
        // this.icons = asset;
      });
    });
  }

  update(): void {}
}
