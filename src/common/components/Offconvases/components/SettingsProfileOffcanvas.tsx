import Offcanvas from "@/common/ui/Offcanvas";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  selectOffconvases,
  toggleSettingsProfileOffcanvas,
} from "@/common/redux/reducers/offconvases";
import { authService } from "@/common/services/auth-service";
import { useRouter } from "next/router";
import { Formik, Field, Form, FormikHelpers, FieldProps } from "formik";
import { DrufflerFullResponse, DrufflerInfoResponse } from "@/common/fetchClient";
import SchemaValidation from "./validation/index";
import Input from "@/common/ui/Input";
import Button from "@/common/ui/Button";
import { PatternFormat } from "react-number-format";

const mockUser: DrufflerFullResponse = {
  role: "string",
  id: "string",
  username: "user@example.com",
  is_active: true,
  is_deleted: false,
  created_at: "2023-02-27T04:30:45.901Z",
  updated_at: "2023-02-27T04:30:45.901Z",
  info: {
    first_name: "stringF",
    last_name: "stringL",
    email: "string@string.ru",
    phone: "",
    position: "string",
    description: "string",
    birthday: "2023-02-27T04:30:45.901Z",
  },
};

const SettingsProfileOffcanvas = () => {
  const { settingsProfileOffcanvas } = useAppSelector(selectOffconvases);
  const dispatch = useAppDispatch();
  const onToggleCanvas = () => dispatch(toggleSettingsProfileOffcanvas());
  const router = useRouter();

  const { info } = mockUser;

  if (!info) {
    return <div>Нет пользователя</div>;
  }

  return (
    <Offcanvas title={"Профиль"} show={settingsProfileOffcanvas} setHide={() => onToggleCanvas()}>
      {/* <FormAccount data={modal.data} /> */}
      <Formik
        initialValues={info}
        validationSchema={SchemaValidation}
        onSubmit={() => console.log("submit")}
        // onSubmit={async (
        //   values: DrufflerInfoResponse,
        //   { setSubmitting }: FormikHelpers<DrufflerInfoResponse>,
        // ) => {
        //   if (isCreating) {
        //     const createBody: AdminUpdateRequest = {
        //       username: values.email,
        //       admin_type: values.admin_type,
        //       info: {
        //         phone: values.phone,
        //         email: values.email,
        //         first_name: values.first_name,
        //         last_name: values.last_name,
        //         position: "",
        //         description: "",
        //       },
        //       hotel_id: hotelId,
        //     };

        //     const createAccountResult = await adminsService.create(createBody, accountId);

        //     if (createAccountResult.status >= 200 && createAccountResult.status < 300) {
        //       mutate();
        //       setHide();
        //     }
        //   } else {
        //     const editBody: AdminInfoUpdateRequest = {
        //       phone: values.phone,
        //       email: values.email,
        //       first_name: values.first_name,
        //       last_name: values.last_name,
        //     };

        //     const editAccountResult = await adminsService.edit(editBody, values.id as string);

        //     if (editAccountResult.status >= 200 && editAccountResult.status < 300) {
        //       mutate();
        //       setHide();
        //     }
        //   }
        // }}
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
                  // TODO разобраться и убрать ts-ignore
                  // @ts-ignore
                  error={errors[field.name]}
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
                  // TODO разобраться и убрать ts-ignore
                  // @ts-ignore
                  error={errors[field.name]}
                />
              )}
            </Field>
            <Field name='email'>
              {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
                <Input
                  className='mt-5'
                  value={field.value}
                  placeholder='Эл. почта'
                  type='email'
                  size='lg'
                  onChange={(e) => {
                    setFieldTouched(field.name, true);
                    setFieldValue(field.name, e.target.value);
                  }}
                  isInvalid={touched[field.name] && !!errors[field.name]}
                  isValid={touched[field.name] && !errors[field.name]}
                  // TODO разобраться и убрать ts-ignore
                  // @ts-ignore
                  error={errors[field.name]}
                  disabled
                />
              )}
            </Field>
            <Field name='phone'>
              {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
                <PatternFormat
                  type='tel'
                  format='+7 (###) ### ####'
                  allowEmptyFormatting
                  mask='_'
                  value={field.value}
                  onValueChange={(values, sourceInfo) => {
                    setFieldTouched(field.name, true);
                    setFieldValue(field.name, values.formattedValue);
                  }}
                  // customInput={() => (
                  //   <Input
                  //     className='mt-5'
                  //     // placeholder='Номер телефона'
                  //     type='text'
                  //     size='lg'
                  //     onChange={() => {
                  //       setFieldTouched(field.name, true);
                  //     // setFieldValue(field.name, e.target.value);
                  //     }}
                  //     isInvalid={touched[field.name] && !!errors[field.name]}
                  //     isValid={touched[field.name] && !errors[field.name]}
                  //     // TODO разобраться и убрать ts-ignore
                  //     // @ts-ignore
                  //     error={errors[field.name]}
                  //   />
                  // )}
                />
              )}
            </Field>

            <div
              className='py-7 btn btn-outline-light text-primary border-0 w-100 text-start mt-10'
              onClick={() => console.log("change password")}
            >
              Изменить пароль
            </div>

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
    </Offcanvas>
  );
};

export default SettingsProfileOffcanvas;
