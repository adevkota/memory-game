import {Game} from "../../src/modules/game";
describe("Game", function() {
    //mock the window object
    let mockWindow = {
      document: {
         querySelector: function() {
            return {
               addEventListener: (type, event)  => {}
            }
         }
      }
   }
   let game;
   let board;
   beforeEach(() => {
      game = new Game(mockWindow);
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