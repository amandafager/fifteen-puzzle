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
  max-width: 90px;
  height: 100%;
  max-height: 90px;
  aspect-ratio: 1 / 1;
  padding: 0;
  margin: 0;
  font-size: inherit;
  font-weight: 500;
  color: #ffffff;
  cursor: ${(props) => (props.$canMove ? 'pointer' : 'not-allowed')};
  background-color: ${(props) => (props.$canMove ? '#000000bf' : '#000000d9')};
  border-radius: 0.1em;

  &:hover {
    @media (hover: hover) {
      transform: ${(props) =>
        props.$canMove ? 'translateY(-0.1rem)' : 'none'};
    }
  }

  &:disabled {
    cursor: default;
    background-color: transparent;
    box-shadow: none;
    transform: none;
  }

  @media (min-width: 768px) {
    width: 100%;
    max-width: 80px;
    height: 100%;
    max-height: 80px;
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
