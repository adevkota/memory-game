import {Board} from "../../src/modules/board";

describe("Board", function() {
   let board;
   let renderSpy;

   //mock the window object so it does not actually bind event
   let mockWindow = {
      document: {
         querySelector: function() {
            return {
               addEventListener: (type, event)  => {}
            }
         }
      }
   }
   beforeEach(() => {
      board = new Board(mockWindow);
      renderSpy = spyOn(board, 'render');
   });

   it("should exist", () => {
      expect(board).toBeDefined();
      expect(board.boardSize).toEqual(24);
   })

   it("init should initlize the board and call render", () => {
      
      expect(board.tilesArray.length).toEqual(0);
      board.init();
      expect(board.tilesArray.length).toEqual(24);
      expect(board.render).toHaveBeenCalled();

   })

   it("render should update innerHTML based on current tilesArray", () => {
      
      //initialize the board but prevent it from calling render
      board.init();
      
      // call render and verify based on above initilization

      let expectedHtml = '';
      board.tilesArray.map((curVal) => {
         spyOn(curVal, "render").and.returnValue("test");
         expectedHtml+='test'
      })
      
      renderSpy.and.callThrough();
      board.render();
      expect(board.boardElement.innerHTML).toEqual(expectedHtml);
   })

   it("tilesMatch should return true if tiles match, false otherwise", () => {

      board.init();
      
      let retVal = board.tilesMatch(1, 2);
      expect(retVal).toEqual(false);
      retVal = board.tilesMatch(1, 1);
      expect(retVal).toEqual(true);
   })
})