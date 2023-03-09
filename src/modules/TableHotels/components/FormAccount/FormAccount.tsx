import { FC } from "react";

import { Formik, Field, Form, FormikHelpers, FieldProps } from "formik";
import { AccountResponse } from "@/common/types/SwaggerTypes";

import Input from "@/common/ui/Input";
import Button from "@/common/ui/Button";

import { accountsService } from "@/services/accounts-service";
import SchemaValidation from "./validation/index";

const initialAccount: AccountResponse = {
  name: "",
  description: "",
  contact_name: "",
  contact_phone: "",
  is_active: true,
  agreement: "",
  id: "",
};

type Props = {
  data: AccountResponse | null;
  setHide: () => void;
  mutate: () => void;
};

const FormAccount: FC<Props> = ({ data, setHide, mutate }) => (
  <div className='d-flex flex-column h-100'>
    <Formik
      initialValues={data ?? initialAccount}
      validationSchema={SchemaValidation}
      onSubmit={async (
        values: AccountResponse,
        { setSubmitting }: FormikHelpers<AccountResponse>,
      ) => {
        if (!data) {
          const createAccountResult = await accountsService.create({
            ...values,
          });

          // TODO нужно посмотреть в каком виде приходят ошибки и как-то их обрабатывать/выводить
          if (createAccountResult.status >= 200 && createAccountResult.status < 300) {
            mutate();
            setHide();
          }
        } else {
          const editAccountResult = await accountsService.edit(
            {
              ...values,
            },
            values.id,
          );

          if (editAccountResult.status >= 200 && editAccountResult.status < 300) {
            mutate();
            setHide();
          }
        }
      }}
    >
      {({ setFieldTouched, isValid, dirty }) => (
        <Form>
          <Field name='name'>
            {({
              field, // { name, value, onChange, onBlur }
              form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            }: FieldProps) => (
              <Input
                value={field.value}
                placeholder='Название аккаунта'
                label='Название аккаунта'
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
          <Field name='description'>
            {({
              field, // { name, value, onChange, onBlur }
              form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            }: FieldProps) => (
              <Input
                className='mt-5'
                value={field.value}
                placeholder='Описание аккаунта'
                label='Описание аккаунта'
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
          <Field name='contact_name'>
            {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
              <Input
                className='mt-5'
                value={field.value}
                placeholder='Имя контактного лица'
                label='Контакты'
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
          <Field name='contact_phone'>
            {({
              field, // { name, value, onChange, onBlur }
              form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            }: FieldProps) => (
              <Input
                className='mt-5'
                value={field.value}
                placeholder='Телефон контактного лица'
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

export default FormAccount;
