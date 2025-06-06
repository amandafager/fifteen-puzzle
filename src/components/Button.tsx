import { Button as AriaButton } from 'react-aria-components';
import { styled } from 'styled-components';

const StyledButton = styled(AriaButton).withConfig({
  displayName: 'Button',
})`
  padding: 0.85rem 1.5rem;
  margin-top: 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  background-color: #000000bf;
  border: none;
  border-radius: 0.2rem;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #000000d9;
    @media (hover: hover) {
      transform: translateY(-0.1rem);
    }
  }

  &:active {
    background-color: #000000f2;
  }

  &:focus-visible {
    outline: 0.15rem solid #ff6b00;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #00000080;
  }
`;

export default StyledButton;
