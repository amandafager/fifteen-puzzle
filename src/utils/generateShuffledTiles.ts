const generateTiles = (rows: number, cols: number): (number | null)[] => {
  const totalTiles = rows * cols;
  const tiles = [];

  // Add the numbered tiles starting from 1
  for (let i = 1; i < totalTiles; i++) {
    tiles.push(i);
  }
  // Add the empty tile
  tiles.push(null);

  return tiles;
};

const shuffleTiles = (tiles: (number | null)[]): (number | null)[] => {
  // Shuffle the tiles
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }

  return tiles;
};

export { generateTiles, shuffleTiles };
