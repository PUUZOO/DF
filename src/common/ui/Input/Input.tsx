import { FC } from "react";
import Form from "react-bootstrap/Form";
import { FormControlProps } from "react-bootstrap";
import classNames from "classnames";

type Props = FormControlProps & { className?: string; label?: string; error?: string };

const Input: FC<Props> = ({ className, label, type = "text", error, ...props }) => {
  return (
    <Form.Group className={classNames(className)}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control {...props} type={type} />
      <Form.Control.Feedback type={"invalid"}>{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default Input;
