import { useHotel } from "@/common/hook/useHotel";
import { useRoomServices } from "@/common/hook/useRoomServices";
import { RoomServicesTypes } from "@/common/types/SwaggerTypes";
import Checkbox from "@/common/ui/Checkbox";
import Input from "@/common/ui/Input";
import { useRouter } from "next/router";
import { Formik, Field, Form, FormikHelpers, FieldProps } from "formik";
import SchemaValidation from "./validation";
import Button from "@/common/ui/Button";
import { useState } from "react";

interface Values {
  custom_name: string;
  description: string;
  price: string;
}

const initialValues: Values = {
  custom_name: "",
  description: "",
  price: "",
};

const TabOtherService = () => {
  const router = useRouter();
  const { createService } = useRoomServices();
  const { id: hotelId } = useHotel();

  const [isFreePrice, setIsFreePrice] = useState<boolean>(false);

  const requestNewService = async (values: Values) => {
    try {
      const response = await createService({
        description: values.description,
        is_active: false,
        service_type: RoomServicesTypes.OTHER,
        hotel_id: hotelId,
        custom_name: values.custom_name,
        price: values?.price ?? "",
      });

      return response.data.id;
    } catch (e) {
      return undefined;
    }
  };

  return (
    <div>
      <h5 className='text-secondary mt-11 mb-4'>Основная информация</h5>
      <Formik
        initialValues={initialValues}
        validationSchema={SchemaValidation}
        onSubmit={async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          const serviceId = await requestNewService(values);

          if (serviceId) {
            router.push("/druffler/hotels");
          }
        }}
      >
        {({ values, setFieldTouched, isValid, dirty, setValues }) => (
          <Form>
            <Field name='custom_name'>
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              }: FieldProps) => (
                <Input
                  className='mb-4'
                  value={field.value}
                  placeholder='Название'
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
            <Field name='description'>
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              }: FieldProps) => (
                <Input
                  className='mb-4'
                  value={field.value}
                  placeholder='Описание (необязательно)'
                  as='textarea'
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

            <Field name='price'>
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              }: FieldProps) => (
                <Input
                  className='mb-4'
                  value={isFreePrice ? "0" : field.value}
                  disabled={isFreePrice}
                  placeholder='Стоимость, ₽'
                  size='lg'
                  onChange={(e) => {
                    setFieldTouched(field.name, true);
                    setFieldValue(field.name, e.target.value);
                  }}
                  type='number'
                  isInvalid={touched[field.name] && !!errors[field.name]}
                  isValid={touched[field.name] && !errors[field.name]}
                  error={errors[field.name]?.toString()}
                />
              )}
            </Field>

            <Field name='free'>
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              }: FieldProps) => (
                <Checkbox
                  checked={field.checked}
                  label='Бесплатная услуга'
                  onChange={(e) => {
                    setIsFreePrice(e.target.checked);
                    setFieldValue(field.name, e.target.checked);
                    setValues({ ...values, price: e.target.checked ? "0" : "" });
                  }}
                />
              )}
            </Field>

            <Button
              size='lg'
              className='mt-8'
              variant='info'
              disabled={!(isValid && dirty)}
              type='submit'
            >
              Опубликовать
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TabOtherService;
