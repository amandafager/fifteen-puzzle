import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tile from '@/components/Tile';
import { generateSolvablePuzzle } from '@/utils/puzzleGenerator';
import { GRID_CONFIG } from '@/config/gameConfig';
import type { TileValue } from '@/types/game';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import {
  checkIfPuzzleIsSolved,
  canTileMove,
  getTilesToMove,
  moveTiles,
  findEmptyTileIndex,
} from '@/utils/gameLogic';

type GameGridProps = {
  $cols: number;
  $rows: number;
};

const StyledGame = styled.div.withConfig({
  displayName: 'Game',
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem 0;
  overflow: auto;
`;

const Heading = styled.h1.withConfig({
  displayName: 'Heading',
})`
  margin-top: 0;
  margin-bottom: 2rem;
  font-size: 1.5rem;

  @media (min-width: 768px) {
    margin-bottom: 2.5rem;
    font-size: 2rem;
  }

  @media (min-width: 1024px) {
    margin-bottom: 3rem;
    font-size: 2.5rem;
  }
`;

const GameGrid = styled.div.withConfig({
  displayName: 'GameGrid',
})<GameGridProps>`
  /* 
   * Grid Layout Configuration
   *
   * The grid scales responsively based on three constraints:
   * 1. Maximum viewport width (100vw - 2.5rem padding)
   * 2. Maximum 50% of viewport height
   * 3. Maximum size based on number of columns (90px per column)
   */
  --max-viewport-width: calc(100vw - 2.5rem);
  --max-height-based: 50vh;
  --max-cols-based: ${(props) => props.$cols * 90}px;
  --total-width: min(
    var(--max-viewport-width),
    var(--max-height-based),
    var(--max-cols-based)
  );
  --grid-padding: 0.3em;
  --grid-gap: 0.2em;

  /* 
   * Calculate actual content width by subtracting padding and gaps
   * Formula: total width - (2 * padding) - (gaps * (columns - 1))
   */
  --content-width: calc(
    var(--total-width) - (2 * var(--grid-padding)) -
      (var(--grid-gap) * (${(props) => props.$cols} - 1))
  );

  /*
   * Dynamically calculates the font size based on the total width and the number of tiles.
   * 
   * Formula breakdown:
   * - Total number of tiles = rows * columns
   * - Logarithmic scaling (log10) is applied to the total number of tiles
   *   to prevent the font size from shrinking too quickly as tile count grows.
   * - The base factor (2 + log10(total tiles)) ensures a minimum scaling.
   * - Font size = total width divided by (columns * (2 + log10(total tiles))).
   *
   */
  --font-size: calc(
    var(--total-width) /
      (
        ${(props) => props.$cols} *
          (2 + ${(props) => Math.log10(props.$rows * props.$cols)})
      )
  );

  display: grid;
  grid-template-rows: repeat(${(props) => props.$rows}, 1fr);
  grid-template-columns: repeat(${(props) => props.$cols}, 1fr);
  gap: var(--grid-gap);
  width: var(--total-width);

  /* 
   * Height calculation
   * Maintains aspect ratio based on:
   * - Content width adjusted by rows/columns ratio
   * - Adding padding and gaps
   */
  height: calc(
    (var(--content-width) * ${(props) => props.$rows / props.$cols}) +
      (2 * var(--grid-padding)) +
      (var(--grid-gap) * (${(props) => props.$rows} - 1))
  );

  padding: var(--grid-padding);
  font-size: var(--font-size);
  background-color: #dadada;
  border-radius: 0.1em;

  @media (min-width: 768px) {
    --total-width: min(
      calc(100vw - 5rem),
      50vh,
      ${(props) => props.$cols * 80}px
    );
  }
`;

const Game = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tiles, setTiles] = useState<TileValue[]>(() => {
    const initialTiles = generateSolvablePuzzle(
      GRID_CONFIG.rows,
      GRID_CONFIG.cols
    );
    return initialTiles;
  });

  const handleOnClickTile = (clickedIndex: number): void => {
    if (!canTileMove(clickedIndex, tiles)) return;

    const emptyIndex = findEmptyTileIndex(tiles);
    const tilesToMove = getTilesToMove(clickedIndex, emptyIndex);
    const newTiles = [...tiles];

    const isForward = clickedIndex < emptyIndex;
    moveTiles(newTiles, tilesToMove, isForward);

    setTiles(newTiles);

    const puzzleSolved = checkIfPuzzleIsSolved(newTiles);
    if (puzzleSolved) {
      setIsModalOpen(true);
    }
  };

  const handleOnClickShuffle = (): void => {
    const newTiles = generateSolvablePuzzle(GRID_CONFIG.rows, GRID_CONFIG.cols);
    setTiles(newTiles);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const handleRestart = (): void => {
    handleOnClickShuffle();
    setIsModalOpen(false);
  };

  // Only for resetting the puzzle when the grid size changes in the config
  useEffect(() => {
    setTiles(generateSolvablePuzzle(GRID_CONFIG.rows, GRID_CONFIG.cols));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GRID_CONFIG.rows, GRID_CONFIG.cols]);

  return (
    <StyledGame>
      <Heading>React - n-puzzle</Heading>
      <GameGrid $cols={GRID_CONFIG.cols} $rows={GRID_CONFIG.rows}>
        {tiles.map((tile, index) => (
          <Tile
            key={tile ? `tile-${tile}` : 'empty-tile'}
            value={tile}
            canMove={canTileMove(index, tiles)}
            onClick={() => handleOnClickTile(index)}
          />
        ))}
      </GameGrid>
      <Button type="button" onClick={handleOnClickShuffle}>
        Slumpa
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onRestart={handleRestart}
      />
    </StyledGame>
  );
};

export default Game;
