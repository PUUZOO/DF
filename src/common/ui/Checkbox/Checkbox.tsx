import { FC } from "react";
import Form from "react-bootstrap/Form";
import { FormCheckProps } from "react-bootstrap/esm/FormCheck";

type Props = FormCheckProps;

// TODO исправить тип
const Checkbox: FC<Props> = ({ ...props }) => {
  return <Form.Check {...props} />;
};

export default Checkbox;
