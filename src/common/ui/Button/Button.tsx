import { FC } from "react";
import ButtonRB, { ButtonProps } from "react-bootstrap/Button";
import styled from "styled-components";

type Props = ButtonProps;
const Button: FC<Props> = ({ children, ...props }) => {
  return <ButtonRB {...props}>{children}</ButtonRB>;
};

export default Button;
