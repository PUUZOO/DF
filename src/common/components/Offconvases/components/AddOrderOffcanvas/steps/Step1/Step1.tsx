import { FC } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { toggleSettingsProfileOffcanvas } from "@/common/redux/reducers/offconvases";
import { authService } from "@/common/services/auth-service";
import { useRouter } from "next/router";
import { Formik, Field, Form, FormikHelpers, FieldProps } from "formik";
import { AdminInfoResponse, DrufflerInfoResponse } from "@/types/SwaggerTypes";
import SchemaValidation from "./validation/index";
import Input from "@/common/ui/Input";
import Button from "@/common/ui/Button";
import { useUser } from "@/common/hook/useUser";
import InputPhone from "@/common/ui/InputPhone";
import { adminsService } from "@/common/services/admins-service";
import { drufflersService } from "@/common/services/drufflers-service";
import { toast } from "react-toastify";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
};

type Props = {
  setStepPassword: () => void;
  setStepEmail: () => void;
};

const Step1: FC<Props> = ({ setStepPassword, setStepEmail }) => {
  const { user, mutateUser } = useUser();

  return (
    <Formik
      initialValues={{ ...initialValues, ...("info" in user ? user.info : {}) }}
      validationSchema={SchemaValidation}
      onSubmit={async (values, { setSubmitting }) => {
        const serviceByRole = {
          druffler: drufflersService,
          admin: adminsService,
        };

        const editAccountResult = await serviceByRole[user.role as keyof typeof serviceByRole].edit(
          { phone: values.phone, first_name: values.first_name, last_name: values.last_name },
          user.id,
        );

        if (editAccountResult.status >= 200 && editAccountResult.status < 300) {
          mutateUser();
          toast.success("Информация обновлена");
        }
      }}
    >
      {({ setFieldTouched, isValid, dirty }) => (
        <Form>
          <Field name='first_name'>
            {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
              <Input
                value={field.value}
                placeholder='Имя'
                type='text'
                size='lg'
                onChange={(e) => {
                  setFieldTouched(field.name, true);
                  setFieldValue(field.name, e.target.value);
                }}
                isInvalid={touched[field.name] && !!errors[field.name]}
                isValid={touched[field.name] && !errors[field.name]}
                error={errors[field.name]?.toString()}
              />
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
};

export default Step1;
