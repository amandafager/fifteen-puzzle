import { useEffect } from 'react';

import Tile from './Tile';

import styled from 'styled-components';

import { useState } from 'react';

import { generateTiles, shuffleTiles } from '@/utils/generateShuffledTiles';

const StyledGame = styled.div.withConfig({
  displayName: 'Game',
})`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameGrid = styled.div.withConfig({
  displayName: 'GameGrid',
})<{ $cols: number; $rows: number }>`
  display: grid;
  grid-template-rows: repeat(${(props) => props.$rows}, 1fr);
  grid-template-columns: repeat(${(props) => props.$cols}, 1fr);
  gap: 0.3rem;
  padding: 1rem;
  background-color: #dadada;
  border: 0.1rem solid #111111;
  border-radius: 0.2rem;
`;

const GRID_ROWS = 4;
const GRID_COLS = 4;

const Game = () => {
  const [tiles, setTiles] = useState<(number | null)[]>([]);

  const findEmptyTileIndex = () => tiles.findIndex((tile) => tile === null);

  const canTileMove = (clickedIndex: number) => {
    const emptyIndex = findEmptyTileIndex();
    const clickedRow = Math.floor(clickedIndex / GRID_ROWS);
    const clickedCol = clickedIndex % GRID_ROWS;
    const emptyRow = Math.floor(emptyIndex / GRID_ROWS);
    const emptyCol = emptyIndex % GRID_ROWS;

    // Check if the clicked tile is in the same row or column as the empty tile
    return clickedRow === emptyRow || clickedCol === emptyCol;
  };

  const handleOnClickTile = (clickedIndex: number) => {
    console.log('clickedIndex', clickedIndex);
  };

  const handleOnClickShuffle = () => {
    setTiles((currentTiles) => {
      const shuffledTiles = shuffleTiles([...currentTiles]);
      return shuffledTiles;
    });
  };

  useEffect(() => {
    setTiles(shuffleTiles(generateTiles(GRID_ROWS, GRID_COLS)));
  }, [GRID_ROWS, GRID_COLS]);

  return (
    <StyledGame>
      <h1>Fifteen Puzzle</h1>
      <GameGrid $cols={GRID_COLS} $rows={GRID_ROWS}>
        {tiles.map((tile, index) => (
          <Tile
            key={tile ? `tile-${tile}` : `empty-${index}`}
            value={tile}
            canMove={canTileMove(index)}
            onClick={() => handleOnClickTile(index)}
          />
        ))}
      </GameGrid>
      <button onClick={handleOnClickShuffle}>Shuffle Tiles</button>
    </StyledGame>
  );
};

export default Game;
