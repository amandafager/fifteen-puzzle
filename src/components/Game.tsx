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

  const findEmptyTileIndex = () => tiles.findIndex((tile) => tile === null);

  const canTileMove = (clickedIndex: number): boolean => {
    const emptyIndex = findEmptyTileIndex();
    const clickedRow = Math.floor(clickedIndex / GRID_CONFIG.rows);
    const clickedCol = clickedIndex % GRID_CONFIG.rows;
    const emptyRow = Math.floor(emptyIndex / GRID_CONFIG.rows);
    const emptyCol = emptyIndex % GRID_CONFIG.rows;

    return clickedRow === emptyRow || clickedCol === emptyCol;
  };

  const handleOnClickTile = (clickedIndex: number): void => {
    console.log('clickedIndex', clickedIndex);
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
