import {Board} from "../../src/modules/board";

describe("Board", function() {
   let board;
   let renderSpy;
   let testIndex = 1;

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

   it("clickHandler should call update if clicked on a different tile", () => {
      board.boardReady = true;
      let event = {
         target: {
            dataset: {
               index: testIndex
            },
            classList: {
               contains: () => true
            }
         }
      }

      spyOn(board, 'update');
      board.onClick(event);
      expect(board.update).toHaveBeenCalled();
   });

   it("clickHandler should not call update if clicked on the same tile", () => {
      board.boardReady = true;
      board.flippedTileIndex = testIndex;
      let event = {
         target: {
            dataset: {
               index: testIndex
            },
            classList: {
               contains: () => true
            }
         }
      }

      spyOn(board, 'update');
      board.onClick(event);
      expect(board.update).not.toHaveBeenCalled();
   });

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

   describe("update method", () => {
      beforeEach(() => {
         board.init();
         board.flippedTileIndex = null;
      })
      it('should update flipped index if it another card is not flipped', () => {
         
         board.update(testIndex);
         expect(board.render).toHaveBeenCalled();
         expect(board.flippedTileIndex).toEqual(testIndex);
      })
   });
})