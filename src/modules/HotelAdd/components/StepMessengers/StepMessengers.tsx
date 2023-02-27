import { Formik, Field, Form, FormikHelpers, FieldProps } from "formik";
import SchemaValidation from "./validation";
import Input from "@/common/ui/Input";
import { FC } from "react";
import styled from "styled-components";
import { contactsService } from "@/common/services/contacts-service";
import { messengersService } from "@/common/services/messengers-service";
import { useAppSelector } from "@/redux/hooks";
import { selectDynamic } from "@/common/redux/reducers/dynamic";
import { toast } from "react-toastify";
import { InitialAllDataType } from "../../HotelAdd";
import Button from "@/common/ui/Button";
import { useRouter } from "next/router";
import { HotelMessengersResponse, ContactTypes } from "@/common/client";
import useSWR from "swr";
import { useHotel } from "@/common/hook/useHotel";
import { HotelContactsResponse } from "@/common/fetchClient";

interface Values {
  contact_type: ContactTypes;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  custom_name?: string;
}

const initialValues: Values = {
  contact_type: ContactTypes["ADMINISTRATOR"],
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  custom_name: "",
};

type Props = {
  title?: string;
  prevStep: () => void;
  nextStep: () => void;
  setAllData: (data: InitialAllDataType) => void;
  hotelId: string | null;
};

const StepMessengers: FC<Props> = ({ title, prevStep, nextStep, setAllData, hotelId }) => {
  const { data: contacts, mutate: mutateContacts } = useSWR<HotelContactsResponse[]>(
    `/api/hotels/${hotelId}/contacts`,
  );

  const { data: messengers, mutate: mutateMessengers } = useSWR<HotelMessengersResponse>(
    `/api/hotels/${hotelId}/messengers`,
  );

  if (!hotelId) {
    return <div className='py-5'>Произошла ошибка</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SchemaValidation}
      onSubmit={async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        nextStep();
        if (hotelId) {
          let response;
          if (contacts?.length) {
            response = await contactsService.update(hotelId, values);
          } else {
            response = await contactsService.create(hotelId, values);
          }

          if (response.status === 201) {
            nextStep();
          } else {
            toast.warn("Произошла ошибка. Попробуйте позже!");
          }
        }
      }}
    >
      {({ setFieldTouched, isValid, dirty }) => (
        <Form className='h-100 d-flex flex-column'>
          <div className='d-flex justify-content-center'>
            <FontWrapper>
              {title && <h2 className='mb-11'>{title}</h2>}
              <Field name='phone'>
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                }: FieldProps) => (
                  <Input
                    label='Контакты'
                    value={field.value}
                    placeholder='Номер телефона'
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
              <Field name='email'>
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                }: FieldProps) => (
                  <Input
                    className='mt-4'
                    value={field.value}
                    placeholder='Электронная почта'
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

              <div className='mt-11'>
                <label className='form-label'>Мессенджеры</label>
                <div className='d-flex mt-7'>
                  <MessengerItemStyled
                    className='me-5'
                    onClick={async () => {
                      if (messengers) {
                        await messengersService.update(hotelId, {
                          telegram: !!messengers?.telegram,
                          whatsup: !messengers?.whatsup,
                        });
                      } else {
                        await messengersService.create(hotelId, {
                          telegram: false,
                          whatsup: true,
                        });
                      }
                      mutateMessengers();
                    }}
                    active={!!messengers?.whatsup}
                  >
                    Whatsapp
                  </MessengerItemStyled>
                  <MessengerItemStyled
                    className='me-5'
                    active={!!messengers?.telegram}
                    onClick={async () => {
                      if (messengers) {
                        await messengersService.update(hotelId, {
                          telegram: !messengers?.telegram,
                          whatsup: !!messengers?.whatsup,
                        });
                      } else {
                        await messengersService.create(hotelId, {
                          telegram: true,
                          whatsup: false,
                        });
                      }
                      mutateMessengers();
                    }}
                  >
                    Telegram
                  </MessengerItemStyled>
                </div>
              </div>
            </FontWrapper>
          </div>

          {/* Control Block */}
          <div className='d-flex justify-content-between align-items-center mt-auto'>
            <div className='text-dark cursor-pointer' onClick={prevStep}>
              Назад
            </div>
            <Button disabled={!isValid || !dirty} type='submit' variant='info'>
              Продолжить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const FontWrapper = styled.div`
  width: 100%;
  max-width: 386px;
`;

const MessengerItemStyled = styled.div<{ active: boolean }>`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  background: ${({ active }) => (active ? "#667482" : "#f0f3f5")};
  color: ${({ active }) => (active ? "#f0f3f5" : "#667482")};
  border-radius: 32px;
  padding: 16px 20px;
  cursor: pointer;
`;

export default StepMessengers;
