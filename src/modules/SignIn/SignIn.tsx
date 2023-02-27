import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@/common/ui/Button";
import Logo from "@/common/components/Logo";
import { Formik, Field, Form, FormikHelpers, FieldProps } from "formik";
import Input from "@/common/ui/Input";
import SchemaValidation from "./validation/index";
import { createNextApiConnection } from "@/common/http/axiosConnection";
import InputPassword from "@/common/ui/InputPassword";

export interface SignInProps {}

interface Values {
  email: string;
  password: string;
}

const initialValues: Values = {
  email: "",
  password: "",
};

const SignIn: FC<SignInProps> = () => {
  const router = useRouter();

  return (
    <div className='h-100 d-flex flex-column justify-content-between'>
      <div>
        <Head>
          <title>Login</title>
        </Head>
        <header>
          <Logo />
        </header>
      </div>
      <div className='d-flex flex-column'>
        <h2 className='mb-5'>Вход</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={SchemaValidation}
          onSubmit={async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
            const result = await createNextApiConnection().post("/login", {
              username: values.email,
              password: values.password,
            });

            if (result.data.isLogin) {
              router.push("./druffler/accounts");
            } else {
              console.log("not login");
            }
          }}
        >
          {({ setFieldTouched }) => (
            <Form>
              <Field name='email'>
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                }: FieldProps) => (
                  <Input
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
                  />
                )}
              </Field>
              <Field name='password'>
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                }: FieldProps) => (
                  <InputPassword
                    className='mt-5'
                    value={field.value}
                    placeholder='Пароль'
                    type='password'
                    size='lg'
                    onChange={(e) => {
                      setFieldTouched(field.name, true);
                      setFieldValue(field.name, e.target.value);
                    }}
                    isInvalid={touched[field.name] && !!errors[field.name]}
                    isValid={touched[field.name] && !errors[field.name]}
                    // TODO тут не понял как мне поступить, в типе указано что может прийти массив строк, но пока не знаю как воспроизвести множественные ошибки и как их лучше отобразить
                    // @ts-ignore
                    error={errors[field.name]}
                  />
                )}
              </Field>
              <div className='d-flex justify-content-end mt-7 mb-10'>
                <Link href=''>
                  <span className='text-info'>Забыли пароль?</span>
                </Link>
              </div>
              <Button className='w-100' variant='info' size='lg' type='submit'>
                Войти
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <div className='text-secondary'>Нет аккаунта?</div>
        <div className='text-secondary'>Свяжитесь с администратором отеля</div>
      </div>
    </div>
  );
};

export default SignIn;
