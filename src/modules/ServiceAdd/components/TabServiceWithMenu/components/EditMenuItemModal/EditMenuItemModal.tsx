import { RoomServiceMenuItemResponse } from "@/common/types/SwaggerTypes";
import Modal from "@/common/ui/Modal";
import { FC } from "react";
import { Formik, Field, Form, FormikHelpers, FieldProps } from "formik";
import { roomServicesService } from "@/common/services/room-services-service";
import { serverErrorOnClient } from "@/common/services/errors-service";
import Input from "@/common/ui/Input";
import Button from "@/common/ui/Button";
import SchemaValidation from "./validation";

export type MenuItemEditModal = { show: boolean; menuItem: RoomServiceMenuItemResponse };

type Props = {
  modal: MenuItemEditModal;
  setModal: any;
  serviceId: string;
  refreshMenu: () => void;
};

const EditMenuItemModal: FC<Props> = ({ modal, setModal, serviceId, refreshMenu }) => {
  return (
    <Modal
      title='Редактирование пункта меню/прайс-листа'
      show={modal.show}
      onHide={() => setModal({ show: false, menuItem: {} })}
      centered
    >
      <Formik
        initialValues={{ ...modal.menuItem }}
        validationSchema={SchemaValidation}
        onSubmit={async (values, { setSubmitting }) => {
          const { id, menu_id, ...otherValues } = values;

          try {
            const editMenuItemResult = await roomServicesService.updateMenuItem(
              otherValues,
              serviceId,
              menu_id,
              id,
            );

            if (editMenuItemResult.status === 200) {
              setModal({ show: false, menuItem: {} });
              refreshMenu();
            }
          } catch (e) {
            serverErrorOnClient(e);
          }
        }}
      >
        {({ setFieldTouched, isValid, dirty }) => (
          <Form>
            <Field name='name'>
              {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
                <Input
                  value={field.value}
                  placeholder='Название'
                  type='text'
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
              {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
                <Input
                  className='mt-5'
                  value={field.value}
                  placeholder='Ингридиенты'
                  type='text'
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
            <Field name='weight'>
              {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
                <Input
                  className='mt-5'
                  value={field.value}
                  placeholder='Вес'
                  type='text'
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
              {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
                <Input
                  className='mt-5'
                  value={field.value}
                  placeholder='Цена'
                  type='number'
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
              className='w-100 mt-5'
              variant='info'
              size='lg'
              type='submit'
              disabled={!(isValid && dirty)}
            >
              Сохранить
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditMenuItemModal;
