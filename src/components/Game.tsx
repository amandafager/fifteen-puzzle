import { useEffect } from 'react';

import styled from 'styled-components';

import { useState } from 'react';

import Tile, { TileValueType } from '@/components/Tile';

import { generateTiles, shuffleTiles } from '@/utils/tileUtils';

const StyledGame = styled.div.withConfig({
  displayName: 'Game',
})`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type GameGridProps = {
  $cols: number;
  $rows: number;
};

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

const ShuffleButton = styled.button.withConfig({
  displayName: 'ShuffleButton',
})`
  margin-top: 1rem;
`;

const Game = () => {
  const GRID_ROWS = 4;
  const GRID_COLS = 4;

  const [tiles, setTiles] = useState<TileValueType[]>([]);

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
    setTiles(shuffleTiles(tiles));
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
      <ShuffleButton onClick={handleOnClickShuffle}>
        Shuffle Tiles
      </ShuffleButton>
    </StyledGame>
  );
};

export default Game;
