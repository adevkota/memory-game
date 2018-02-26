import {Tile} from "../../src/modules/tile";
describe("Tile", function() {
   let tile;

   let testIndex = 1;
   let testValue = 2;
   beforeEach(() => {
      tile = new Tile(testIndex, testValue);
   })
   it("should have new board", () => {
      expect(tile).toBeDefined();
      expect(tile.index).toEqual(testIndex);
      expect(tile.value).toEqual(testValue);
   });

   it("flip method should flip the tile", () => {
      expect(tile.isFlipped).toEqual(false);
      tile.flip();
      expect(tile.isFlipped).toEqual(true);
      tile.flip();
      expect(tile.isFlipped).toEqual(false);
   });
   
   it("markSolved method should mark tile as solved", () => {
      expect(tile.isSolved).toEqual(false);
      tile.markSolved();
      expect(tile.isSolved).toEqual(true);
   });

   it("render should return a div  with appropriate value", () =>{
      let retVal = tile.render();
      expect(retVal).toContain(`data-index = ${testIndex}`);
      expect(retVal).not.toContain(`style = 'visibility:hidden'`);
      expect(retVal).toContain(`class="tile"`);

   })
})