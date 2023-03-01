import { FC, ReactNode } from "react";
import styled from "styled-components";
import Button from "@/common/ui/Button";
import folderIcon from "@/images/folder.svg";
import plusIcon from "@/images/plus-icon.svg";

type Props = {
  icon?: { src: string };
  title: string;
  description?: string;
  onClick?: () => void;
  btnChildren?: string | ReactNode;
};

const EmptyTable: FC<Props> = ({ icon = folderIcon, title, description, onClick, btnChildren }) => {
  return (
    <EmptyTableStyled className='d-flex flex-column align-items-center justify-content-center'>
      <img src={icon.src} alt='' />
      <h3>{title}</h3>
      {description && (
        <h6 className='mt-2 text-secondary text-center' style={{ fontWeight: 400 }}>
          {description}
        </h6>
      )}
      {typeof onClick === "function" && btnChildren && (
        <Button variant='info' className='mt-10' onClick={onClick}>
          {btnChildren}
        </Button>
      )}
    </EmptyTableStyled>
  );
};

const EmptyTableStyled = styled.div`
  background: #fbfafe;
  border-radius: 12px;
  height: 330px;
`;

export default EmptyTable;
