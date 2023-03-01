import { FC } from "react";
import { PatternFormat } from "react-number-format";
import classNames from "classnames";
import Form from "react-bootstrap/Form";

interface InputPhoneFormat {
  value: string | undefined;
  onChange?: (value: string) => void;
  format?: string;
  className?: string;
  isInvalid?: boolean;
  isValid?: boolean;
  placeholder?: string;
  error?: string;
}

const InputPhone: FC<InputPhoneFormat> = ({
  value,
  className,
  format = "+7 (###) ###-##-##",
  placeholder = "",
  onChange,
  isInvalid,
  isValid,
  error,
  ...props
}) => {
  return (
    <>
      <PatternFormat
        value={value}
        onValueChange={(values, sourceInfo) => {
          if (typeof onChange == "function") onChange(values.formattedValue);
        }}
        className={classNames([
          "form-control",
          "form-control-lg",
          className,
          isValid && "is-valid",
          isInvalid && "is-invalid",
          "mt-5",
        ])}
        placeholder={placeholder ? placeholder : format}
        format={format}
        mask='_'
        {...props}
      />
      <Form.Control.Feedback type={"invalid"}>{error}</Form.Control.Feedback>
    </>
  );
};

export default InputPhone;
