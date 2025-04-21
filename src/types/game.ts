// Type for tile values - can be a number or null for empty tile
export type TileValue = number | null;

export interface GridConfig {
  readonly rows: number;
  readonly cols: number;
}
