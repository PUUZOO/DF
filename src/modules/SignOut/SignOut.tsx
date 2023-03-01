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

export interface SignOutProps {
  tempToken: string | undefined;
}

interface Values {
  password: string;
}

const initialValues: Values = {
  password: "",
};

const SignOut: FC<SignOutProps> = ({ tempToken }) => {
  const { push } = useRouter();

  return (
    <div className='h-100 d-flex flex-column justify-content-between'>
      <Head>
        <title>Вход</title>
      </Head>
      <header>
        <Logo />
      </header>

      <div className='my-auto'>
        <Formik
          initialValues={initialValues}
          validationSchema={SchemaValidation}
          onSubmit={async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
            const result = await createNextApiConnection().post("/register", {
              password: values.password,
              token: tempToken,
            });

            if (result.data.isLogin) {
              push("./druffler/accounts");
            }
          }}
        >
          {({ setFieldTouched }) => (
            <Form>
              <h2 className='mb-5'>Регистрация</h2>
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
                    error={errors[field.name]?.toString()}
                  />
                )}
              </Field>
              <Button className='w-100 mt-5' variant='info' size='lg' type='submit'>
                Зарегистрироваться
              </Button>
              <div className='text-secondary mt-7'>
                Есть аккаунт?
                <Link href={"/login"} className='ms-2 text-info'>
                  Войдите
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignOut;
