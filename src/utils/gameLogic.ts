import type { TileValue } from '@/types/game';
import { GRID_CONFIG } from '@/config/gameConfig';

// Checks if the puzzle is in a solved state.
// A puzzle is solved when all tiles are in ascending order (1 to n-1)
// and the empty tile (null) is in the last position.
export const checkIfPuzzleIsSolved = (array: TileValue[]): boolean => {
  return array.every((tile, index) =>
    index === array.length - 1 ? tile === null : tile === index + 1
  );
};

// Converts a 1D array index to 2D grid coordinates.
export const getTileCoords = (index: number) => ({
  row: Math.floor(index / GRID_CONFIG.cols),
  col: index % GRID_CONFIG.cols,
});

// Finds the index of the empty tile (null) in the puzzle.
export const findEmptyTileIndex = (tiles: TileValue[]): number =>
  tiles.findIndex((tile) => tile === null);

// Determines if a tile can be moved based on its position relative to the empty space.
// A tile can move if it's in the same row or column as the empty space.
export const canTileMove = (
  clickedIndex: number,
  tiles: TileValue[]
): boolean => {
  const emptyIndex = findEmptyTileIndex(tiles);
  const { row: clickedRow, col: clickedCol } = getTileCoords(clickedIndex);
  const { row: emptyRow, col: emptyCol } = getTileCoords(emptyIndex);

  return clickedRow === emptyRow || clickedCol === emptyCol;
};

// Gets the sequence of tile positions that need to move when a tile is clicked.
// For horizontal moves, returns all positions between clicked tile and empty space in that row.
// For vertical moves, returns all positions between clicked tile and empty space in that column.
export const getTilesToMove = (
  clickedIndex: number,
  emptyIndex: number
): number[] => {
  const { row: clickedRow, col: clickedCol } = getTileCoords(clickedIndex);
  const { row: emptyRow, col: emptyCol } = getTileCoords(emptyIndex);

  if (clickedRow === emptyRow) {
    // Calculate positions for horizontal movement in the same row
    const start = Math.min(clickedCol, emptyCol);
    const end = Math.max(clickedCol, emptyCol);
    return Array.from(
      { length: end - start + 1 },
      (_, i) => clickedRow * GRID_CONFIG.cols + (start + i)
    );
  } else if (clickedCol === emptyCol) {
    // Calculate positions for vertical movement in the same column
    const start = Math.min(clickedRow, emptyRow);
    const end = Math.max(clickedRow, emptyRow);
    return Array.from(
      { length: end - start + 1 },
      (_, i) => (start + i) * GRID_CONFIG.cols + clickedCol
    );
  }
  return [];
};

// Performs the actual movement of tiles by updating the array in place.
// Moves tiles either forward (toward lower indexes) or backward (toward higher indexes).
// The direction depends on whether the clicked tile is before or after the empty space.
export const moveTiles = (
  tilesArray: TileValue[],
  indexes: number[],
  forward: boolean
): void => {
  if (forward) {
    // Move tiles right to left
    for (let i = indexes.length - 1; i > 0; i--) {
      tilesArray[indexes[i]] = tilesArray[indexes[i - 1]];
    }
    tilesArray[indexes[0]] = null;
  } else {
    // Move tiles left to right
    for (let i = 0; i < indexes.length - 1; i++) {
      tilesArray[indexes[i]] = tilesArray[indexes[i + 1]];
    }
    tilesArray[indexes[indexes.length - 1]] = null;
  }
};
