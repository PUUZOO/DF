import { FC, ReactNode } from "react";
import Image from "next/image";
import styled from "styled-components";
import LetterAvatar from "@/ui/LetterAvatar";

interface Props {
  name?: string | null;
  children: ReactNode;
  action?: () => void;
}

const PlusButton: FC<Props> = ({ name, action, children, ...props }) => {
  return (
    <ButtonStyled
      type='button'
      className='btn btn-link d-flex p-0 align-items-center'
      {...props}
      onClick={action}
    >
      {name ? (
        <LetterAvatar name={name} />
      ) : (
        <PlusStyled className='plus rounded-circle me-6 d-flex align-items-center justify-content-center'>
          <span>+</span>
        </PlusStyled>
      )}

      {children}
    </ButtonStyled>
  );
};

const PlusStyled = styled.div`
  border: 1.5px dashed var(--bs-info);
  height: 32px;
  width: 32px;
  min-width: 32px;

  & > span {
    font-size: 32px;
    line-height: 32px;
    padding-bottom: 3px;
    font-weight: 300;
    color: var(--bs-info);
  }
`;

const ButtonStyled = styled.button`
  &:hover {
    .plus {
      background: var(--bs-info);
      & > span {
        color: white;
      }
    }
  }
`;

export default PlusButton;
