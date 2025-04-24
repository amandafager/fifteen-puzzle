import type { TileValue } from '@/types/game';
import { GRID_CONFIG } from '@/config/gameConfig';

export const checkIfPuzzleSolved = (array: TileValue[]): boolean => {
  return array.every((tile, index) =>
    index === array.length - 1 ? tile === null : tile === index + 1
  );
};

export const getTileCoords = (index: number) => ({
  row: Math.floor(index / GRID_CONFIG.cols),
  col: index % GRID_CONFIG.cols,
});

export const findEmptyTileIndex = (tiles: TileValue[]): number =>
  tiles.findIndex((tile) => tile === null);

export const canTileMove = (
  clickedIndex: number,
  tiles: TileValue[]
): boolean => {
  const emptyIndex = findEmptyTileIndex(tiles);
  const { row: clickedRow, col: clickedCol } = getTileCoords(clickedIndex);
  const { row: emptyRow, col: emptyCol } = getTileCoords(emptyIndex);

  return clickedRow === emptyRow || clickedCol === emptyCol;
};

export const getTilesToMove = (
  clickedIndex: number,
  emptyIndex: number
): number[] => {
  const { row: clickedRow, col: clickedCol } = getTileCoords(clickedIndex);
  const { row: emptyRow, col: emptyCol } = getTileCoords(emptyIndex);

  if (clickedRow === emptyRow) {
    // Move horizontally
    const start = Math.min(clickedCol, emptyCol);
    const end = Math.max(clickedCol, emptyCol);
    return Array.from(
      { length: end - start + 1 },
      (_, i) => clickedRow * GRID_CONFIG.cols + (start + i)
    );
  } else if (clickedCol === emptyCol) {
    // Move vertically
    const start = Math.min(clickedRow, emptyRow);
    const end = Math.max(clickedRow, emptyRow);
    return Array.from(
      { length: end - start + 1 },
      (_, i) => (start + i) * GRID_CONFIG.cols + clickedCol
    );
  }
  return [];
};

export const moveTiles = (
  tilesArray: TileValue[],
  indexes: number[],
  forward: boolean
): void => {
  if (forward) {
    indexes.reduceRight((_, currentIndex, i) => {
      if (i > 0) {
        tilesArray[indexes[i]] = tilesArray[indexes[i - 1]];
      }
      return null;
    }, null);
    tilesArray[indexes[0]] = null;
  } else {
    indexes.reduce((_, currentIndex, i) => {
      if (i < indexes.length - 1) {
        tilesArray[indexes[i]] = tilesArray[indexes[i + 1]];
      }
      return null;
    }, null);
    tilesArray[indexes[indexes.length - 1]] = null;
  }
};
