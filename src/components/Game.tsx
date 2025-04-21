import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tile from '@/components/Tile';
import { generateTiles, shuffleTiles } from '@/utils/tileUtils';
import { GRID_CONFIG } from '@/config/gameConfig';
import type { TileValue } from '@/types/game';
import Button from '@/components/Button';

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
`;

const GameGrid = styled.div.withConfig({
  displayName: 'GameGrid',
})<GameGridProps>`
  display: grid;
  grid-template-rows: repeat(${(props) => props.$rows}, 1fr);
  grid-template-columns: repeat(${(props) => props.$cols}, 1fr);
  gap: 0.3rem;
  padding: 1rem;
  background-color: #dadada;
  border: 0.1rem solid #111111;
  border-radius: 0.2rem;
`;

const Game = () => {
  const [tiles, setTiles] = useState<TileValue[]>(() =>
    shuffleTiles(generateTiles(GRID_CONFIG.rows, GRID_CONFIG.cols))
  );

  // Utility: Get row/col from index
  const getTileCoords = (index: number) => ({
    row: Math.floor(index / GRID_CONFIG.rows),
    col: index % GRID_CONFIG.rows,
  });

  // Cache the empty index once per move to avoid recomputation
  const findEmptyTileIndex = () => tiles.findIndex((tile) => tile === null);

  // Checks if clicked tile is in the same row or column as empty tile
  const canTileMove = (clickedIndex: number): boolean => {
    const emptyIndex = findEmptyTileIndex();
    const { row: clickedRow, col: clickedCol } = getTileCoords(clickedIndex);
    const { row: emptyRow, col: emptyCol } = getTileCoords(emptyIndex);

    return clickedRow === emptyRow || clickedCol === emptyCol;
  };

  // Builds an array of tile indexes between the clicked and empty tile
  const getTilesToMove = (
    clickedIndex: number,
    emptyIndex: number
  ): number[] => {
    const { row: clickedRow, col: clickedCol } = getTileCoords(clickedIndex);
    const { row: emptyRow, col: emptyCol } = getTileCoords(emptyIndex);

    const tilesToMove: number[] = [];

    if (clickedRow === emptyRow) {
      // Move horizontally
      const start = Math.min(clickedCol, emptyCol);
      const end = Math.max(clickedCol, emptyCol);
      for (let col = start; col <= end; col++) {
        tilesToMove.push(clickedRow * GRID_CONFIG.rows + col);
      }
    } else if (clickedCol === emptyCol) {
      // Move vertically
      const start = Math.min(clickedRow, emptyRow);
      const end = Math.max(clickedRow, emptyRow);
      for (let row = start; row <= end; row++) {
        tilesToMove.push(row * GRID_CONFIG.rows + clickedCol);
      }
    }

    return tilesToMove;
  };

  // Handles moving the tile values toward empty space
  const moveTiles = (
    tilesArray: TileValue[],
    indexes: number[],
    forward: boolean
  ): void => {
    if (forward) {
      for (let i = indexes.length - 1; i > 0; i--) {
        tilesArray[indexes[i]] = tilesArray[indexes[i - 1]];
      }
      tilesArray[indexes[0]] = null;
    } else {
      for (let i = 0; i < indexes.length - 1; i++) {
        tilesArray[indexes[i]] = tilesArray[indexes[i + 1]];
      }
      tilesArray[indexes[indexes.length - 1]] = null;
    }
  };

  const handleOnClickTile = (clickedIndex: number): void => {
    if (!canTileMove(clickedIndex)) return;

    const emptyIndex = findEmptyTileIndex();
    const tilesToMove = getTilesToMove(clickedIndex, emptyIndex);
    const newTiles = [...tiles];

    const isForward = clickedIndex < emptyIndex;
    moveTiles(newTiles, tilesToMove, isForward);

    setTiles(newTiles);
  };

  const handleOnClickShuffle = (): void => {
    setTiles((currentTiles) => shuffleTiles([...currentTiles]));
  };

  useEffect(() => {
    setTiles(shuffleTiles(generateTiles(GRID_CONFIG.rows, GRID_CONFIG.cols)));
  }, [GRID_CONFIG.rows, GRID_CONFIG.cols]);

  return (
    <StyledGame>
      <h1>Fifteen Puzzle</h1>
      <GameGrid $cols={GRID_CONFIG.cols} $rows={GRID_CONFIG.rows}>
        {tiles.map((tile, index) => (
          <Tile
            key={tile ? `tile-${tile}` : `empty-${index}`}
            value={tile}
            canMove={canTileMove(index)}
            onClick={() => handleOnClickTile(index)}
          />
        ))}
      </GameGrid>
      <Button onClick={handleOnClickShuffle}>Shuffle</Button>
    </StyledGame>
  );
};

export default Game;
