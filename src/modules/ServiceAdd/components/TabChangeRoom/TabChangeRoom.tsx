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
}

const initialValues: Values = {
  custom_name: "",
  description: "",
};

const TabChangeRoom = () => {
  const router = useRouter();
  const { createService } = useRoomServices();
  const { id: hotelId } = useHotel();

  const requestNewService = async (values: Values) => {
    try {
      const response = await createService({
        description: values.description,
        is_active: false,
        service_type: RoomServicesTypes.UPGRADE_ROOM,
        hotel_id: hotelId,
        custom_name: values.custom_name,
      });

      return response.data.id;
    } catch (e) {
      return undefined;
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        // validationSchema={SchemaValidation}
        onSubmit={async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          const serviceId = await requestNewService(values);

          if (serviceId) {
            router.push("/druffler/hotels");
          }
        }}
      >
        {({ values, setFieldTouched, isValid, dirty }) => (
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

            <Button
              size='lg'
              className='mt-8'
              variant='info'
              // disabled={!(isValid && dirty)}
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

export default TabChangeRoom;
