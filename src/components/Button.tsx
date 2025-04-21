import { styled } from 'styled-components';

export const Button = styled.button.withConfig({
  displayName: 'Button',
})`
  padding: 1rem 3rem;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  background-color: rgba(1, 1, 1, 0.75);
  border: none;
  border-radius: 0.2rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(1, 1, 1, 0.85);
  }

  &:active {
    background-color: rgba(1, 1, 1, 0.95);
  }

  &:focus-visible {
    outline: 0.15rem solid #ff6b00;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: rgba(1, 1, 1, 0.5);
  }
`;

export default Button;
