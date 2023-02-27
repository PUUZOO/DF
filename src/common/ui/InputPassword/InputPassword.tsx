import { FC, useState } from "react";
import Form from "react-bootstrap/Form";
import { FormControlProps, InputGroup } from "react-bootstrap";
import classNames from "classnames";
import Image from "next/image";
import Button from "../Button";

type Props = { className?: string; label?: string; error?: string } & FormControlProps;

const InputPassword: FC<Props> = ({ className, label, error, ...props }) => {
  const [isPassword, setIsPassword] = useState<boolean>(true);

  return (
    <InputGroup hasValidation className={classNames(className)}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control {...props} type={isPassword ? "password" : "text"} />
      <Button variant='outline-light'  onClick={() => setIsPassword(!isPassword)}>
        <Image
          src={isPassword ? "/svg/closed_eye.svg" : "/svg/eye.svg"}
          width={24}
          height={24}
          alt=''
        />
      </Button>
      <Form.Control.Feedback type={"invalid"}>{error}</Form.Control.Feedback>
    </InputGroup>
  );
};

export default InputPassword;
