import { ReactNode } from "react";
import { Formik, Field, Form, FormikHelpers, FieldProps } from "formik";
import SchemaValidation from "./validation/index";
import Input from "@/common/ui/Input";
import { FC } from "react";
import styled from "styled-components";
import Link from "next/link";
import { accountsService } from "@/common/services/accounts-service";
import { useAppSelector } from "@/redux/hooks";
import { selectDynamic } from "@/common/redux/reducers/dynamic";
import { toast } from "react-toastify";
import { InitialAllDataType } from "../../HotelAdd";
import Button from "@/common/ui/Button";
import { useRouter } from "next/router";
import { HotelStateTypes } from "@/common/types/SwaggerTypes";

interface Values {
  name: string;
  description: string;
}

const initialValues: Values = {
  name: "",
  description: "",
};

type Props = {
  title?: string;
  nextStep: (hotelId: string) => void;
  setAllData: (data: InitialAllDataType) => void;
};

const StepMainInfo: FC<Props> = ({ title, nextStep, setAllData }) => {
  const dynamic = useAppSelector(selectDynamic);
  const router = useRouter();

  const accountId = dynamic.accountId ? dynamic.accountId : (router.query.accountId as string);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SchemaValidation}
      onSubmit={async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        if (accountId) {
          const result = await accountsService.createHotel(accountId, {
            name: values.name,
            description: values.description,
            state: HotelStateTypes["SET_NAME"],
            is_active: true,
          });
          if (result.data) {
            nextStep(result.data.id);
          } else {
            toast.warn("Произошла ошибка. Попробуйте позже!");
          }
        }
      }}
    >
      {({ setFieldTouched, isValid, dirty }) => (
        <Form className='h-100 d-flex flex-column align-items-center justify-content-center'>
          <StepWrapper>
            {title && <h2 className='mb-11'>{title}</h2>}
            <Field name='name'>
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              }: FieldProps) => (
                <Input
                  value={field.value}
                  placeholder='Название'
                  type='text'
                  size='lg'
                  onChange={(e) => {
                    setFieldTouched(field.name, true);
                    setFieldValue(field.name, e.target.value);
                    setAllData({ [field.name]: e.target.value });
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
                  placeholder='Описание'
                  type='text'
                  as='textarea'
                  size='lg'
                  onChange={(e) => {
                    setFieldTouched(field.name, true);
                    setFieldValue(field.name, e.target.value);
                    setAllData({ [field.name]: e.target.value });
                  }}
                  isInvalid={touched[field.name] && !!errors[field.name]}
                  isValid={touched[field.name] && !errors[field.name]}
                />
              )}
            </Field>
          </StepWrapper>

          {/* Control Block */}
          <div className='d-flex w-100 justify-content-end mt-auto'>
            <Button type='submit' disabled={!isValid || !dirty} variant='info'>
              Продолжить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const StepWrapper = styled.div`
  width: 100%;
  max-width: 386px;
`;

export default StepMainInfo;
