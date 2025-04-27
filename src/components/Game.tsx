import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tile from '@/components/Tile';
import { generateSolvablePuzzle } from '@/utils/puzzleGenerator';
import { GRID_CONFIG } from '@/config/gameConfig';
import type { TileValue } from '@/types/game';
import Button from '@/components/Button';
import {
  checkIfPuzzleIsSolved,
  canTileMove,
  getTilesToMove,
  moveTiles,
  findEmptyTileIndex,
} from '@/utils/gameLogic';
import { logPuzzleAnalysis } from '@/utils/debug';

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
  overflow: auto;
  font-size: 1.5rem;
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
  --total-width: min(
    calc(100vw - 40px),
    50vh,
    ${(props) => props.$cols * 60}px
  );
  --grid-padding: 0.3em;
  --content-width: calc(var(--total-width) - (var(--grid-padding) * 2));
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
  gap: 0.2em;
  width: var(--total-width);
  height: calc(
    var(--content-width) * ${(props) => props.$rows / props.$cols} +
      (var(--grid-padding) * 2)
  );
  padding: var(--grid-padding);
  font-size: var(--font-size);
  background-color: #dadada;
  border-radius: 0.1em;

  @media (min-width: 1024px) {
    --total-width: min(
      calc(100vw - 80px),
      50vh,
      ${(props) => props.$cols * 75}px
    );

    width: var(--total-width);
    height: calc(
      var(--content-width) * ${(props) => props.$rows / props.$cols} +
        (var(--grid-padding) * 2)
    );
  }
`;

const Game = () => {
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [tiles, setTiles] = useState<TileValue[]>(() => {
    const initialTiles = generateSolvablePuzzle(
      GRID_CONFIG.rows,
      GRID_CONFIG.cols
    );
    logPuzzleAnalysis(initialTiles, GRID_CONFIG.rows, GRID_CONFIG.cols);
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
    logPuzzleAnalysis(newTiles, GRID_CONFIG.rows, GRID_CONFIG.cols);

    const isSolved = checkIfPuzzleIsSolved(newTiles);
    if (isSolved) {
      setIsSolved(true);
      console.log('Congratulations! Puzzle solved!');
    }
  };

  const handleOnClickShuffle = (): void => {
    const newTiles = generateSolvablePuzzle(GRID_CONFIG.rows, GRID_CONFIG.cols);
    setTiles(newTiles);
    logPuzzleAnalysis(newTiles, GRID_CONFIG.rows, GRID_CONFIG.cols);
    setIsSolved(false);
  };

  useEffect(() => {
    setTiles(generateSolvablePuzzle(GRID_CONFIG.rows, GRID_CONFIG.cols));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GRID_CONFIG.rows, GRID_CONFIG.cols]);

  return (
    <StyledGame>
      <Heading>React - n-puzzle</Heading>
      {isSolved && <h2>Puzzle solved!</h2>}
      <GameGrid $cols={GRID_CONFIG.cols} $rows={GRID_CONFIG.rows}>
        {tiles.map((tile, index) => (
          <Tile
            key={tile ? `tile-${tile}` : `empty-${index}`}
            value={tile}
            canMove={canTileMove(index, tiles)}
            onClick={() => handleOnClickTile(index)}
          />
        ))}
      </GameGrid>
      <Button onClick={handleOnClickShuffle}>Slumpa</Button>
    </StyledGame>
  );
};

export default Game;
