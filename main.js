import { player } from "./player.js";

let player1 = player();

player1.place();
console.log(player1.getBoard().getBoard());