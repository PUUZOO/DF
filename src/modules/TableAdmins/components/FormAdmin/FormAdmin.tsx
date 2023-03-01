import { FC } from "react";
import { Formik, Field, Form, FormikHelpers, FieldProps } from "formik";
import {
  AdminTypes,
  AdminUpdateRequest,
  AdminFullResponse,
  AdminInfoUpdateRequest,
} from "@/common/types/SwaggerTypes";
import { useHotel } from "@/common/hook/useHotel";
import Input from "@/common/ui/Input";
import Button from "@/common/ui/Button";
import { serverErrorOnClient } from "@/common/services/errors-service";
import { adminsService } from "@/services/admins-service";
import SchemaValidation from "./validation/index";
import AdminType from "./AdminType";

const initialValues = {
  id: 0,
  admin_type: AdminTypes.ADMINISTRATOR,
  username: "",
  first_name: "",
  last_name: "",
  phone: "",
};

type Props = {
  data: AdminFullResponse | null;
  setHide: () => void;
  mutate: () => void;
  accountId: string;
};

const FormAccount: FC<Props> = ({ data, setHide, mutate, accountId }) => {
  const isCreating = !data;
  const { id: hotelId } = useHotel();

  return (
    <div className='d-flex flex-column h-100'>
      <Formik
        initialValues={{
          ...initialValues,
          username: data?.username,
          phone: data?.info.phone,
          first_name: data?.info.first_name,
          last_name: data?.info.last_name,
          id: data ? data.id : 0,
        }}
        validationSchema={SchemaValidation}
        onSubmit={async (values, { setSubmitting }) => {
          if (data) {
            try {
              const createBody: AdminUpdateRequest = {
                username: values.username ?? "",
                admin_type: values.admin_type,
                info: {
                  phone: values.phone ?? "",
                  first_name: values.first_name,
                  last_name: values.last_name,
                  position: "",
                  description: "",
                },
                hotel_id: hotelId,
              };

              const createAccountResult = await adminsService.create(createBody, accountId);

              if (createAccountResult.status >= 200 && createAccountResult.status < 300) {
                mutate();
                setHide();
              }
            } catch (e) {
              serverErrorOnClient(e);
            }
          } else {
            const editBody: AdminInfoUpdateRequest = {
              first_name: values.first_name,
              last_name: values.last_name,
              phone: values.phone ?? "",
            };

            const editAccountResult = await adminsService.edit(editBody, values.id as string);

            if (editAccountResult.status >= 200 && editAccountResult.status < 300) {
              mutate();
              setHide();
            }
          }
        }}
      >
        {({ values, setFieldTouched, isValid, dirty }) => (
          <Form>
            <Field name='first_name'>
              {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
                <Input
                  value={field.value}
                  placeholder='Имя'
                  label='Личные данные'
                  type='text'
                  size='lg'
                  onChange={(e) => {
                    setFieldTouched(field.name, true);
                    setFieldValue(field.name, e.target.value);
                  }}
                  isInvalid={touched[field.name] && !!errors[field.name]}
                  isValid={touched[field.name] && !errors[field.name]}
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
                />
              )}
            </Field>
            <Field name='username'>
              {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
                <Input
                  className='mt-5'
                  value={field.value}
                  placeholder='Эл. почта'
                  label='Контакты'
                  type='email'
                  size='lg'
                  onChange={(e) => {
                    setFieldTouched(field.name, true);
                    setFieldValue(field.name, e.target.value);
                  }}
                  isInvalid={touched[field.name] && !!errors[field.name]}
                  isValid={touched[field.name] && !errors[field.name]}
                />
              )}
            </Field>
            <Field name='phone'>
              {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
                <Input
                  className='mt-5'
                  value={field.value}
                  placeholder='Номер телефона (необязательно)'
                  type='text'
                  size='lg'
                  onChange={(e) => {
                    setFieldTouched(field.name, true);
                    setFieldValue(field.name, e.target.value);
                  }}
                  isInvalid={touched[field.name] && !!errors[field.name]}
                  isValid={touched[field.name] && !errors[field.name]}
                />
              )}
            </Field>
            <Field name='admin_type'>
              {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
                <AdminType
                  type={field.value}
                  onChange={(value) => {
                    setFieldTouched(field.name, true);
                    setFieldValue(field.name, value);
                  }}
                  isDisabled={!isCreating}
                />
              )}
            </Field>
            <div className='d-flex justify-content-end mt-7 mb-10'></div>
            <Button
              className='w-100'
              variant='info'
              size='lg'
              type='submit'
              disabled={!(isValid && dirty)}
            >
              {!data ? "Добавить" : "Редактировать"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormAccount;
