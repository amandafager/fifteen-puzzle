export type TileValue = number | null;

// Dimensions must be greater than 1 to ensure puzzle is solvable
type ValidDimension = number & { __brand: 'ValidDimension' };

// Type guard to ensure dimensions are greater than 1
export const isValidDimension = (n: number): n is ValidDimension => n > 1;

export interface GridConfig {
  readonly rows: ValidDimension;
  readonly cols: ValidDimension;
}
