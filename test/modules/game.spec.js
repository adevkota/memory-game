import {Game} from "../../src/modules/game";
describe("Game", function() {
   let game;
   let board;
   beforeEach(() => {
      game = new Game();
      board = game.board
      spyOn(board, "init");
   })
   it("should have new board", () => {
      expect(game.board).toBeDefined();
   });

   it("init should initialize the game's board", () => {
      game.init();
      expect(board.init).toHaveBeenCalled();
   })
})