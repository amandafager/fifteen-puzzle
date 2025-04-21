import { TileValueType } from '@/components/Tile';

const generateTiles = (rows: number, cols: number): TileValueType[] => {
  const totalTiles = rows * cols;
  const tiles: TileValueType[] = [];

  // Add the numbered tiles starting from 1
  for (let i = 1; i < totalTiles; i++) {
    tiles.push(i);
  }
  // Add the empty tile
  tiles.push(null);

  return tiles;
};

const shuffleTiles = (tiles: TileValueType[]): TileValueType[] => {
  const newTiles = [...tiles];

  // Shuffle the tiles
  for (let i = newTiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
  }

  return newTiles;
};

export { generateTiles, shuffleTiles };
