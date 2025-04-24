import type { TileValue } from '@/types/game';
import { findEmptyTileIndex } from './gameLogic';
import { countInversions, isSolvable } from './puzzleGenerator';

interface GridPosition {
  index: number;
  row: number;
  col: number;
}

interface SolvabilityAnalysis {
  inversions: number;
  blankRowFromBottom: number;
  gridWidth: number;
  isEvenWidth: boolean;
  isSolvable: boolean;
}

export const analyzePuzzleState = (
  tiles: TileValue[],
  rows: number,
  cols: number
): {
  grid: (number | '_')[][];
  emptyPosition: GridPosition;
  solvability: SolvabilityAnalysis;
} => {
  // Create grid visualization
  const grid = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => {
      const value = tiles[i * cols + j];
      return value === null ? '_' : value;
    })
  );

  // Get empty tile position
  const emptyIndex = findEmptyTileIndex(tiles);
  const emptyPosition = {
    index: emptyIndex,
    row: Math.floor(emptyIndex / cols),
    col: emptyIndex % cols,
  };

  // Analyze solvability
  const inversions = countInversions(tiles);
  const blankRowFromBottom = rows - emptyPosition.row;

  const solvability = {
    inversions,
    blankRowFromBottom,
    gridWidth: cols,
    isEvenWidth: cols % 2 === 0,
    isSolvable: isSolvable(tiles, rows, cols),
  };

  return {
    grid,
    emptyPosition,
    solvability,
  };
};

export const logPuzzleAnalysis = (
  tiles: TileValue[],
  rows: number,
  cols: number
): void => {
  const analysis = analyzePuzzleState(tiles, rows, cols);

  console.group('Puzzle State Analysis');
  console.log('Grid State:');
  console.table(analysis.grid);

  console.log('Empty Space Position:', analysis.emptyPosition);

  console.group('Solvability Analysis');
  const { solvability } = analysis;
  console.log(
    `Grid Width: ${solvability.gridWidth} (${solvability.isEvenWidth ? 'even' : 'odd'})`
  );
  console.log(`Inversions: ${solvability.inversions}`);
  console.log(`Blank Row From Bottom: ${solvability.blankRowFromBottom}`);
  console.log(`Is Solvable: ${solvability.isSolvable}`);
  console.log(
    `Reason: ${
      solvability.isEvenWidth
        ? `Even width: (inversions + blank row from bottom) = ${
            solvability.inversions + solvability.blankRowFromBottom
          } must be even`
        : `Odd width: inversions (${solvability.inversions}) must be even`
    }`
  );
  console.groupEnd();
  console.groupEnd();
};
