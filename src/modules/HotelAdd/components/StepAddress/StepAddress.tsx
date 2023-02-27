import { Formik, Field, Form, FormikHelpers, FieldProps } from "formik";
import SchemaValidation from "./validation/index";
import { FC } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { InitialAllDataType } from "../../HotelAdd";
import Button from "@/common/ui/Button";
import { hotelsAddressService } from "@/common/services/hotels-address-service";
import MapsYa from "./components/MapsYa";
import Alert from "react-bootstrap/Alert";

interface Values {
  country: string;
  city: string;
  street: string;
  building: string;
}

const initialValues: Values = {
  country: "",
  city: "",
  street: "",
  building: "",
};

type Props = {
  title?: string;
  prevStep: () => void;
  nextStep: () => void;
  setAllData: (data: InitialAllDataType) => void;
  hotelId: string | null;
};

const StepAddress: FC<Props> = ({ title, prevStep, nextStep, setAllData, hotelId }) => {
  if (!hotelId) {
    return <div className='py-5'>Произошла ошибка</div>;
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={SchemaValidation}
        onSubmit={async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          const result = await hotelsAddressService.create(hotelId, values);

          if (result.data) {
            nextStep();
          } else {
            toast.warn("Произошла ошибка. Попробуйте позже!");
          }
        }}
      >
        {({ errors, isValid, dirty, setValues, validateForm }) => (
          <Form className='h-100 d-flex flex-column'>
            <div className='d-flex justify-content-center'>
              <FontWrapper>
                {title && <h2 className='mb-11'>{title}</h2>}
                <Field name='country'>
                  {({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  }: FieldProps) => (
                    <>
                      {JSON.stringify(errors) !== "{}" && (
                        <Alert variant='warning'>
                          {errors?.country ? <span className='me-2'>{errors?.country}</span> : ""}
                          {errors?.city ? <span className='me-2'>{errors?.city}</span> : ""}
                          {errors?.street ? <span className='me-2'>{errors?.street}</span> : ""}
                          {errors?.building ? <span className='me-2'>{errors?.building}</span> : ""}
                        </Alert>
                      )}

                      <MapsYa
                        onChange={(address) => {
                          const country = address.find((item) => item.kind === "country");
                          const city = address.find((item) => item.kind === "locality");
                          const street = address.find((item) => item.kind === "street");
                          const building = address.find((item) => item.kind === "house");

                          validateForm();

                          const data = {
                            country: country ? country.name : "",
                            city: city ? city.name : "",
                            street: street ? street.name : "",
                            building: building ? building.name : "",
                          };

                          setValues(data);
                          setAllData(data);
                        }}
                      />
                    </>
                  )}
                </Field>
              </FontWrapper>
            </div>

            {/* Control Block */}
            <div className='d-flex justify-content-between align-items-center mt-auto'>
              <div className='text-dark cursor-pointer' onClick={prevStep}>
                Назад
              </div>
              <Button type='submit' variant='info' disabled={!isValid || !dirty}>
                Продолжить
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

const FontWrapper = styled.div`
  width: 100%;
  max-width: 386px;
`;

export default StepAddress;
