import type { TileValue } from '@/types/game';

const generateTiles = (rows: number, cols: number): TileValue[] => {
  const totalTiles = rows * cols;
  const tiles: TileValue[] = [];

  // Add the numbered tiles starting from 1
  for (let i = 1; i < totalTiles; i++) {
    tiles.push(i);
  }
  // Add the empty tile
  tiles.push(null);

  return tiles;
};

const shuffleTiles = (tiles: TileValue[]): TileValue[] => {
  const newTiles = [...tiles];

  // Shuffle the tiles
  for (let i = newTiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
  }

  return newTiles;
};

export { generateTiles, shuffleTiles };
