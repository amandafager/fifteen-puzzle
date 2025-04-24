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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 60px;
  height: 100%;
  max-height: 60px;
  aspect-ratio: 1 / 1;
  padding: 0;
  margin: 0;
  /*  font-size: clamp(0.7rem, 2vmin, 1.2rem); */
  font-weight: bold;
  color: #fff;
  cursor: ${(props) => (props.$canMove ? 'pointer' : 'not-allowed')};
  background-color: ${(props) =>
    props.$canMove ? 'rgba(1, 1, 1, 0.75)' : 'rgba(1, 1, 1, 0.85)'};

  &:disabled {
    cursor: default;
    background-color: transparent;
    box-shadow: none;
    transform: none;
  }

  @media (min-width: 1024px) {
    width: 100%;
    max-width: 75px;
    height: 100%;
    max-height: 75px;
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
