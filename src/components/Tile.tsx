import styled from 'styled-components';

export type TileValueType = number | null;

interface TileProps {
  value: TileValueType;
  canMove: boolean;
  onClick: () => void;
}

const StyledTile = styled.button.withConfig({
  displayName: 'Tile',
})<{ $canMove: boolean }>`
  width: 4rem;
  height: 4rem;
  padding: 0px;
  margin: 0rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  cursor: ${(props) => (props.$canMove ? 'pointer' : 'not-allowed')};
  background-color: rgba(1, 1, 1, 0.75);
  border: none;
  border-radius: 0.2rem;
  transition: all 0.2s ease;

  &:focus {
    outline: 0.15rem solid #ff6b00;
  }

  &:focus-visible {
    outline: 0.15rem solid #ff6b00;
  }

  &:hover {
    background-color: rgba(1, 1, 1, 0.85);
  }

  &:active {
    background-color: rgba(1, 1, 1, 0.95);
  }

  &:disabled {
    cursor: default;
    background-color: transparent;
    box-shadow: none;
    transform: none;
  }
`;

const Tile = ({ value, canMove, onClick }: TileProps) => {
  return (
    <StyledTile
      $canMove={canMove}
      onClick={canMove ? onClick : undefined}
      disabled={value === null}
      aria-label={value ? `Tile ${value}` : 'Empty tile'}
    >
      {value}
    </StyledTile>
  );
};

export default Tile;
