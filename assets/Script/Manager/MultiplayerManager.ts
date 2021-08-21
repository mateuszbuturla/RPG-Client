import { io, Socket } from "socket.io-client/dist/socket.io.js";
import { filterObject } from "../Utils/filterObject";
const { ccclass, property } = cc._decorator;

@ccclass
export default class MultiplayerManager extends cc.Component {
  @property(cc.Prefab)
  playerPrefab: cc.Prefab;

  socket: Socket;
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

    this.socket.on("connect", () => {
      console.log(`Socket.ID: ${this.socket.id}`);
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
