import { Modal as AriaModal, Dialog, Heading } from 'react-aria-components';
import styled from 'styled-components';
import StyledButton from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
}

const StyledDialog = styled(Dialog).withConfig({
  displayName: 'StyledDialog',
})`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1000;
  width: calc(100% - 2.5rem);
  max-width: 25rem;
  padding: 1.5rem;
  text-align: center;
  outline: none;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -50%);
`;

const Overlay = styled.div.withConfig({
  displayName: 'Overlay',
})`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledHeading = styled(Heading).withConfig({
  displayName: 'StyledHeading',
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

  ${StyledButton} {
    margin-top: 0;
  }
`;

const Modal = ({ isOpen, onClose, onRestart }: ModalProps) => {
  return (
    <AriaModal
      isOpen={isOpen}
      onOpenChange={(isOpen: boolean) => !isOpen && onClose()}
      isDismissable
    >
      {isOpen && <Overlay />}
      <StyledDialog>
        <StyledHeading slot="title">Grattis!</StyledHeading>
        <Message>Du har löst pusslet!</Message>
        <ButtonContainer>
          <StyledButton onPress={onRestart}>Starta om</StyledButton>
          <StyledButton onPress={onClose}>Stäng</StyledButton>
        </ButtonContainer>
      </StyledDialog>
    </AriaModal>
  );
};

export default Modal;
