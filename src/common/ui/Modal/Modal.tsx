import { FC, ReactNode } from "react";
import ModalBS, { ModalProps } from "react-bootstrap/Modal";

type Props = {
  title?: string;
  children: ReactNode | ReactNode[];
  show: boolean;
  onHide: () => void;
};

const Modal: FC<Props & ModalProps> = ({ title, children, show, onHide, ...props }) => {
  return (
    <ModalBS show={show} onHide={onHide} {...props}>
      <ModalBS.Header className='border-0 pb-0' closeButton>
        {title && <ModalBS.Title>{title}</ModalBS.Title>}
      </ModalBS.Header>

      <ModalBS.Body>{children}</ModalBS.Body>
    </ModalBS>
  );
};

export default Modal;
