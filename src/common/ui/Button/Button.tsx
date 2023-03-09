import { FC } from "react";
import ButtonRB, { ButtonProps } from "react-bootstrap/Button";
import styled from "styled-components";

type Props = ButtonProps;
const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <ButtonRB {...props} style={props.variant === "link" ? { color: "var(--bs-info)" } : {}}>
      {children}
    </ButtonRB>
  );
};

export default Button;
