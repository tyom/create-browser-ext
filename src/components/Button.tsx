import { ComponentChildren } from 'preact';
import styled from 'styled-components';

type ButtonProps = {
  children: ComponentChildren;
  onClick: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  background: #89dcea;
  border: 1px solid #555;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: #71ddef;
  }
`;
