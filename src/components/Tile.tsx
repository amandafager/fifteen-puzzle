import styled from 'styled-components';
import type { TileValue } from '@/types/game';
import { Button } from './Button';

type StyledTileProps = {
  $canMove: boolean;
};

interface TileProps {
  value: TileValue;
  canMove: boolean;
  onClick: () => void;
}

const StyledTile = styled(Button).withConfig({
  displayName: 'Tile',
})<StyledTileProps>`
  width: 4rem;
  height: 4rem;
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  cursor: ${(props) => (props.$canMove ? 'pointer' : 'not-allowed')};

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
