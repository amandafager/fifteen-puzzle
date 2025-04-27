import { type GridConfig, isValidDimension } from '@/types/game';

const rows = 4;
const cols = 4;

if (!isValidDimension(rows) || !isValidDimension(cols)) {
  throw new Error('Grid dimensions must be greater than 1');
}

export const GRID_CONFIG: GridConfig = {
  rows: rows as GridConfig['rows'],
  cols: cols as GridConfig['cols'],
} as const;
