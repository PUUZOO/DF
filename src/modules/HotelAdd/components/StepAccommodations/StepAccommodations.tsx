import { Formik, Field, Form, FormikHelpers, FieldProps } from "formik";
import SchemaValidation from "./validation/index";
import { FC } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { InitialAllDataType } from "../../HotelAdd";
import Button from "@/common/ui/Button";
import Checkbox from "@/ui/Checkbox/Checkbox";
import moment from "moment";
import { hotelsAccommodationsService } from "@/common/services/hotels-accommodations-service";
import TimePicker from "@/common/ui/TimePicker";

interface Values {
  check_in: number;
  check_out: number;
  breakfastAllWeekSameTime: boolean;
  breakfast_start: number;
  breakfast_end: number;
  weekend_breakfast_start: number;
  weekend_breakfast_end: number;
  children_allowed: boolean;
  home_pet_allowed: boolean;
  cash_payment: boolean;
  card_payment: boolean;
}

const initialValues: Values = {
  check_in: new Date().setHours(14, 0, 0),
  check_out: new Date().setHours(12, 0, 0),
  breakfastAllWeekSameTime: true,
  breakfast_start: new Date().setHours(6, 0, 0),
  breakfast_end: new Date().setHours(10, 0, 0),
  weekend_breakfast_start: new Date().setHours(7, 0, 0),
  weekend_breakfast_end: new Date().setHours(11, 0, 0),
  children_allowed: true,
  home_pet_allowed: false,
  cash_payment: false,
  card_payment: false,
};

type Props = {
  title?: string;
  prevStep: () => void;
  nextStep: () => void;
  setAllData: (data: InitialAllDataType) => void;
  hotelId: string | null;
};

const StepAccommodations: FC<Props> = ({ title, prevStep, nextStep, setAllData, hotelId }) => {
  if (!hotelId) {
    return <div className='py-5'>Произошла ошибка</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={SchemaValidation}
      onSubmit={async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        const {
          check_in,
          check_out,
          breakfastAllWeekSameTime,
          breakfast_end,
          breakfast_start,
          weekend_breakfast_end,
          weekend_breakfast_start,
          ...otherValues
        } = values;

        const preparedValues = {
          ...otherValues,

          check_in: moment(check_in).format("HH:mm:ss"),
          check_out: moment(check_out).format("HH:mm:ss"),

          breakfast_start: moment(breakfast_start).format("HH:mm:ss"),
          breakfast_end: moment(breakfast_end).format("HH:mm:ss"),

          weekend_breakfast_start: breakfastAllWeekSameTime
            ? moment(breakfast_start).format("HH:mm:ss")
            : moment(weekend_breakfast_start).format("HH:mm:ss"),
          weekend_breakfast_end: breakfastAllWeekSameTime
            ? moment(breakfast_end).format("HH:mm:ss")
            : moment(weekend_breakfast_end).format("HH:mm:ss"),
        };

        if (hotelId) {
          const result = await hotelsAccommodationsService.create(
            preparedValues,
            hotelId as string,
          );
          if (result.data) {
            nextStep();
          } else {
            toast.warn("Произошла ошибка. Попробуйте позже!");
          }
        }
      }}
    >
      {({ setFieldTouched, values }) => (
        <Form className='h-100 d-flex flex-column'>
          <div className='d-flex justify-content-center'>
            <FontWrapper>
              {title && <h2 className='mb-11'>{title}</h2>}
              <div className='row mt-5'>
                <span className='text-secondary'>Время заезда и выезда</span>
                <div className='col-6'>
                  <Field name='check_in'>
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    }: FieldProps) => (
                      <TimePicker
                        value={field.value}
                        setFieldValue={(date) => setFieldValue(field.name, date)}
                      />
                    )}
                  </Field>
                </div>
                <div className='col-6'>
                  <Field name='check_out'>
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    }: FieldProps) => (
                      <TimePicker
                        value={field.value}
                        setFieldValue={(date) => setFieldValue(field.name, date)}
                      />
                    )}
                  </Field>
                </div>
              </div>
              <div className='row mt-5'>
                {values.breakfastAllWeekSameTime ? (
                  <span className='text-secondary'>Время завтрака</span>
                ) : (
                  <span className='text-secondary'>Время завтрака по будням</span>
                )}

                <div className='col-6'>
                  <Field name='breakfast_start'>
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    }: FieldProps) => (
                      <TimePicker
                        value={field.value}
                        setFieldValue={(date) => setFieldValue(field.name, date)}
                      />
                    )}
                  </Field>
                </div>
                <div className='col-6'>
                  <Field name='breakfast_end'>
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    }: FieldProps) => (
                      <TimePicker
                        value={field.value}
                        setFieldValue={(date) => setFieldValue(field.name, date)}
                      />
                    )}
                  </Field>
                </div>
                {!values.breakfastAllWeekSameTime && (
                  <div className='row mt-5'>
                    <span className='text-secondary'>Время завтрака по выходным</span>
                    <div className='col-6'>
                      <Field name='weekend_breakfast_start'>
                        {({
                          field, // { name, value, onChange, onBlur }
                          form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        }: FieldProps) => (
                          <TimePicker
                            value={field.value}
                            setFieldValue={(date) => setFieldValue(field.name, date)}
                          />
                        )}
                      </Field>
                    </div>
                    <div className='col-6'>
                      <Field name='weekend_breakfast_end'>
                        {({
                          field, // { name, value, onChange, onBlur }
                          form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        }: FieldProps) => (
                          <TimePicker
                            value={field.value}
                            setFieldValue={(date) => setFieldValue(field.name, date)}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                )}
                <div className='row mt-5'>
                  <div className='col-12'>
                    <Field name='breakfastAllWeekSameTime'>
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      }: FieldProps) => (
                        <Checkbox
                          label='Одинаковое по будням и выходным'
                          checked={field.value}
                          onChange={() => setFieldValue(field.name, !field.value)}
                        />
                      )}
                    </Field>
                  </div>
                </div>
              </div>

              <div className='row mt-5'>
                <div className='col-12'>
                  <span>Проживание</span>
                  <Field name='children_allowed'>
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    }: FieldProps) => (
                      <Checkbox
                        label='Можно с детьми'
                        checked={field.value}
                        onChange={() => setFieldValue(field.name, !field.value)}
                      />
                    )}
                  </Field>
                  <Field name='home_pet_allowed'>
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    }: FieldProps) => (
                      <Checkbox
                        label='Можно с животными'
                        checked={field.value}
                        onChange={() => setFieldValue(field.name, !field.value)}
                      />
                    )}
                  </Field>
                </div>
              </div>
              <div className='row mt-5'>
                <div className='col-12'>
                  <span>Способы оплаты</span>
                  <Field name='cash_payment'>
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    }: FieldProps) => (
                      <Checkbox
                        label='Наличными'
                        checked={field.value}
                        onChange={() => setFieldValue(field.name, !field.value)}
                      />
                    )}
                  </Field>
                  <Field name='card_payment'>
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    }: FieldProps) => (
                      <Checkbox
                        label='По карте'
                        checked={field.value}
                        onChange={() => setFieldValue(field.name, !field.value)}
                      />
                    )}
                  </Field>
                </div>
              </div>
            </FontWrapper>
          </div>

          {/* Control Block */}
          <div className='d-flex justify-content-between align-items-center mt-auto'>
            <div className='text-dark cursor-pointer' onClick={prevStep}>
              Назад
            </div>
            <Button type='submit' variant='info'>
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

export default StepAccommodations;
