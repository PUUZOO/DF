import { FC } from "react";
import { Formik, Field, Form, FormikHelpers, FieldProps } from "formik";
import { ChangePasswordIn } from "@/types/SwaggerTypes";
import SchemaValidation from "../StepInfo/validation/index";
import Button from "@/common/ui/Button";
import { useUser } from "@/common/hook/useUser";

import { adminsService } from "@/common/services/admins-service";
import { drufflersService } from "@/common/services/drufflers-service";
import { toast } from "react-toastify";
import InputPassword from "@/ui/InputPassword/InputPassword";
import Link from "next/link";

type Props = {
  setStepInfo: () => void;
};

const StepPassword: FC<Props> = ({ setStepInfo }) => {
  const { user } = useUser();

  const { role, id } = user;

  const initialValues = {
    old_password: "",
    new_password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SchemaValidation}
      onSubmit={async (
        values: ChangePasswordIn,
        { setSubmitting }: FormikHelpers<ChangePasswordIn>,
      ) => {
        if (role === "admin") {
          const changePasswordResult = await adminsService.changePassword(values, id);

          if (changePasswordResult.status >= 200 && changePasswordResult.status < 300) {
            toast.success("Пароль обновлен");
            setStepInfo();
          }
        }
      }}
    >
      {({ setFieldTouched, isValid, dirty }) => (
        <Form className='d-flex flex-column justify-content-between'>
          <Field name='old_password'>
            {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
              <InputPassword
                value={field.value}
                placeholder='Текущий пароль'
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
          <Field name='new_password'>
            {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
              <InputPassword
                className='mt-5'
                value={field.value}
                placeholder='Новый пароль'
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

          {/* // TODO указать ссылку на страницу сброса пароля */}
          <Link href={"/"} className='text-info d-block text-center mt-5'>
            Забыли пароль?
          </Link>

          <Button
            className='w-100 mt-5'
            variant='info'
            size='lg'
            type='submit'
            disabled={!(isValid && dirty)}
          >
            Сохранить
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default StepPassword;
