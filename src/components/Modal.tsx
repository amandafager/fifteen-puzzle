import styled from 'styled-components';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
}

const ModalOverlay = styled.div.withConfig({
  displayName: 'ModalOverlay',
})`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ModalContent = styled.div.withConfig({
  displayName: 'ModalContent',
})`
  max-width: 90%;
  padding: 2rem;
  text-align: center;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2.withConfig({
  displayName: 'Title',
})`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #000000;
`;

const Message = styled.p.withConfig({
  displayName: 'Message',
})`
  margin: 0 0 2rem 0;
  font-size: 1rem;
  color: #666666;
`;

const ButtonContainer = styled.div.withConfig({
  displayName: 'ButtonContainer',
})`
  display: flex;
  gap: 1rem;
  justify-content: center;

  ${Button} {
    margin-top: 0;
  }
`;

const Modal = ({ isOpen, onClose, onRestart }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Grattis!</Title>
        <Message>Du har löst pusslet!</Message>
        <ButtonContainer>
          <Button onClick={onRestart}>Starta om</Button>
          <Button onClick={onClose}>Stäng</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
