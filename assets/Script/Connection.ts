import { io } from "socket.io-client/dist/socket.io.js";
const { ccclass, property } = cc._decorator;

const filterObject = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

@ccclass("Connection")
export class Connection extends cc.Component {
  socket;

  @property(cc.Prefab)
  playerPrefab: cc.Prefab;

  playerList: any = {};

  localPlayer: any;

  start() {
    console.log("Starting connection to socket.io server");
    this.socket = io("http://localhost:3000", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
      transports: ["websocket", "polling", "flashsocket"],
    });

    // client-side
    this.socket.on("connect", () => {
      console.log(`Socket.ID: ${this.socket.id}`); // x8WIv7-mJelg7on_ALbx
    });

    this.socket.on("newPositions", (data) => {
      const scene = cc.director.getScene();
      const thisPlayer = data.players.find(
        (player) => player.id === this.socket.id
      );

      if (thisPlayer) {
        if (this.localPlayer) {
          this.localPlayer.setPosition(
            new cc.Vec3(thisPlayer.x, thisPlayer.y, 0)
          );
        } else {
          const node = cc.instantiate(this.playerPrefab);
          node.setPosition(new cc.Vec3(thisPlayer.x, thisPlayer.y, 0));
          scene.addChild(node);
          this.localPlayer = node;
        }
      }
      data.players.map((player) => {
        if (player.id !== this.socket.id) {
          if (!this.playerList.hasOwnProperty(player.id)) {
            const node = cc.instantiate(this.playerPrefab);
            node.setPosition(new cc.Vec3(player.x, player.y, 0));
            node.removeComponent("PlayerMovement");
            scene.addChild(node);
            this.playerList[player.id] = { id: player.id, node: node };
          } else {
            this.playerList[player.id].node.setPosition(
              new cc.Vec3(player.x, player.y, 0)
            );
          }
        }
      });

      const disconnectedPlayers = filterObject(
        this.playerList,
        (player) => !data.players.map((player) => player.id).includes(player.id)
      );

      Object.keys(disconnectedPlayers).forEach((key) => {
        disconnectedPlayers[key].node.destroy();
        delete this.playerList[disconnectedPlayers[key].id];
      });
    });

    global.socket = this.socket;
  }
}
