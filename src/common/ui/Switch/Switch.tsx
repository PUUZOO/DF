import { FC } from "react";
import Form from "react-bootstrap/Form";
import { FormCheckProps } from "react-bootstrap/esm/FormCheck";

type Props = FormCheckProps;

const Switch: FC<Props> = ({ ...props }) => {
  return <Form.Switch {...props} />;
};

export default Switch;
