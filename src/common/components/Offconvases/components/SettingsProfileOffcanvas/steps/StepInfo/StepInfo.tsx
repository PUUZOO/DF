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

const StepInfo: FC<Props> = ({ setStepPassword, setStepEmail }) => {
  const dispatch = useAppDispatch();
  const onToggleCanvas = () => dispatch(toggleSettingsProfileOffcanvas());
  const router = useRouter();
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
          <Field name='last_name'>
            {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
              <Input
                className='mt-5'
                value={field.value}
                placeholder='Фамилия'
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
          <Field name='email'>
            {({ field }: FieldProps) => (
              <Button
                className='mt-5 text-primary border-0 w-100 text-start'
                size='lg'
                onClick={setStepEmail}
                variant='outline-light'
              >
                {field.value ?? "Эл.почта"}
              </Button>
            )}
          </Field>
          <Field name='phone'>
            {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
              <InputPhone
                value={field.value}
                isInvalid={touched[field.name] && !!errors[field.name]}
                isValid={touched[field.name] && !errors[field.name]}
                placeholder='Телефон'
                onChange={(value) => {
                  console.log(value);
                  setFieldTouched(field.name, true);
                  setFieldValue(field.name, value);
                }}
                error={errors[field.name]?.toString()}
              />
            )}
          </Field>

          {/* //TODO пока скрыл этот пункт для драффлера, когда появится страница сброса пароля, сделать здесь ссылку на неё */}
          {user.role === "admin" && (
            <div
              className='py-7 btn btn-outline-light text-primary border-0 w-100 text-start mt-10'
              onClick={setStepPassword}
            >
              Изменить пароль
            </div>
          )}

          <div
            className='py-7 btn btn-outline-light text-primary border-0 w-100 text-start'
            onClick={async () => {
              const response = await authService.logout();

              if (response.status === 200) {
                onToggleCanvas();
                router.push("/login");
              }
            }}
          >
            Выйти
          </div>

          <div className='d-flex justify-content-end mt-7 mb-10'></div>
          <Button
            className='w-100'
            variant='info'
            size='lg'
            type='submit'
            disabled={!(isValid && dirty)}
          >
            Сохранить изменения
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default StepInfo;
