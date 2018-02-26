import {Game} from "../../src/modules/game";
describe("Game", function() {
   let game;
   beforeEach(() => {
      game = new Game();
      spyOn(game, "init");
   })
   it("should have new board", () => {
      expect(game.board).toBeDefined();
   });

   it("init should initialize the game's board", () => {

   })
})