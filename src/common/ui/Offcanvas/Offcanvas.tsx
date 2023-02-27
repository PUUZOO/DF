import OffcanvasBS from "react-bootstrap/Offcanvas";
import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  show: boolean;
  title: string;
  setHide: () => void;
  children?: ReactNode;
};

const Offcanvas: FC<Props> = ({ show, title, setHide, children }) => {
  return (
    <OffcanvasBS show={show} onHide={setHide} placement='end'>
      <OffcanvasBS.Header closeButton>
        <OffcanvasBS.Title>
          <h2>{title}</h2>
        </OffcanvasBS.Title>
      </OffcanvasBS.Header>
      <OffcanvasBS.Body className='pt-0'>{children}</OffcanvasBS.Body>
    </OffcanvasBS>
  );
};

export default Offcanvas;
