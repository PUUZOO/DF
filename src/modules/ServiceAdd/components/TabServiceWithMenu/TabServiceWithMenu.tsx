import { Dispatch, FC, SetStateAction, useState } from "react";
import InputFile from "@/common/ui/InputFile";
import iconFolder from "@/images/icon-folder.svg";
import Input from "@/common/ui/Input";
import { useRoomServices } from "@/common/hook/useRoomServices";
import { useHotel } from "@/common/hook/useHotel";
import { Formik, Field, Form, FormikHelpers, FieldProps } from "formik";
import Modal from "@/ui/Modal";
import {
  RoomServicesTypes,
  RoomServiceMenuItemResponse,
  RoomServiceCreateRequest,
} from "@/types/SwaggerTypes";
import MenuTable from "@/common/components/MenuTable";
import Button from "@/common/ui/Button";
import { useRouter } from "next/router";
import SchemaValidation from "./validation";
import { TableType } from "./TableType";
import Checkbox from "@/common/ui/Checkbox";
import EditMenuItemModal from "./components/EditMenuItemModal";

type Props = {
  type: RoomServicesTypes;
  setAllData: Dispatch<SetStateAction<RoomServiceMenuItemResponse[]>>;
};

interface Values {
  custom_name: string;
  description: string;
  price?: string;
  fixPrice: boolean;
}

const initialValues: Values = {
  custom_name: "",
  description: "",
  fixPrice: false,
};

const TabServiceWithMenu: FC<Props> = ({ type, setAllData }) => {
  const router = useRouter();
  const { createService, uploadMenu, getMenuItems } = useRoomServices();
  const { id: hotelId } = useHotel();
  const [modal, setModal] = useState<{
    show: boolean;
    menuList: RoomServiceMenuItemResponse[];
    menuId: string;
  }>({
    show: false,
    menuList: [],
    menuId: "",
  });

  const [modalEdit, setModalEdit] = useState<{
    show: boolean;
    menuItem: RoomServiceMenuItemResponse;
  }>({
    show: false,
    menuItem: { id: "0", is_active: false, menu_id: "0", name: "", price: "0" },
  });

  const [serviceIdToEdit, setServiceIdToEdit] = useState<string>("");

  const requestNewService = async (values: Values) => {
    const body: RoomServiceCreateRequest = {
      description: values.description,
      is_active: false,
      service_type: type,
      hotel_id: hotelId,
      custom_name: values.custom_name,
    };

    if (values.fixPrice) body.price = values.price;

    try {
      const response = await createService(body);

      return response.data.id;
    } catch (e) {
      return undefined;
    }
  };

  const getAllMenuItems = async (serviceId: string, menuId: string) => {
    const menuList = await getMenuItems(serviceId, menuId);

    if (menuList.status === 200) {
      setModal({ show: true, menuList: menuList.data, menuId });
      setAllData(menuList.data);
    }
  };

  const workerForNewMenu = async (values: Values, files: File[]) => {
    // Create new service
    const serviceId = await requestNewService(values);

    if (serviceId) {
      setServiceIdToEdit(serviceId);
      const formData = new FormData();
      formData.append("file", files[0]);

      // Upload new menu
      const responseNewMenu = await uploadMenu(serviceId, formData);

      if (responseNewMenu.status === 201) {
        const menuId = responseNewMenu.data.id;

        getAllMenuItems(serviceId, menuId);
      }
    }
  };

  const createServiceWithFixPrice = async (values: Values) => {
    // Create new service
    const serviceId = await requestNewService(values);

    if (serviceId) {
      router.push("/druffler/hotels");
      setModal({ show: false, menuList: [], menuId: "" });
    }
  };

  return (
    <>
      <Modal
        size='lg'
        title='Прайс-лист'
        show={modal.show}
        onHide={() => setModal({ show: !modal, menuList: [], menuId: "" })}
        centered
      >
        {/* //TODO fix ts-ignore  */}
        {/* @ts-ignore */}
        <MenuTable columns={TableType(type, setModalEdit)} data={modal.menuList} />
        <Button
          size='lg'
          className='w-100 mt-8'
          variant='info'
          onClick={() => {
            router.push("/druffler/hotels");
            setModal({ show: false, menuList: [], menuId: "" });
          }}
        >
          Перейти к услуге
        </Button>
        <Button
          size='lg'
          className='w-100 mt-3'
          variant='link'
          onClick={() => setModal({ show: false, menuList: [], menuId: "" })}
        >
          Загрузить другой файл
        </Button>
      </Modal>
      <EditMenuItemModal
        modal={modalEdit}
        setModal={setModalEdit}
        serviceId={serviceIdToEdit}
        refreshMenu={() => getAllMenuItems(serviceIdToEdit, modal.menuId)}
      />
      {/* Forma */}
      <Formik
        initialValues={initialValues}
        validationSchema={SchemaValidation}
        onSubmit={async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {}}
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

            <Field name='fixPrice'>
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              }: FieldProps) => (
                <Checkbox
                  className='mb-4'
                  checked={field.value}
                  label='Фиксированная цена'
                  onChange={(e) => {
                    setFieldValue(field.name, e.target.checked);
                  }}
                />
              )}
            </Field>

            {/* <Switch
              className='mb-4'
              label='Указать фиксированную цену'
              checked={isFixedPrice}
              onClick={() => setIsFixedPrice(!isFixedPrice)}
            /> */}

            {!values.fixPrice && (
              <Field name='menu'>
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                }: FieldProps) => (
                  <>
                    <h5 className='text-secondary mb-7 mt-11'>Прайс-лист</h5>
                    <InputFile
                      count={1}
                      onUpload={(files) => {
                        workerForNewMenu(values, files);
                      }}
                      disabled={!(isValid && dirty)}
                    >
                      <img src={iconFolder.src} alt='Добавить прайс-лист' />
                      <div
                        className='text-center mt-6'
                        style={{
                          maxWidth: "228px",
                          fontSize: "14px",
                          lineHeight: "18px",
                          color: "#667482",
                        }}
                      >
                        Перетащите таблицу xls в поле или загрузите с компьютера
                      </div>
                    </InputFile>
                  </>
                )}
              </Field>
            )}
            {values.fixPrice && (
              <>
                <Field name='price'>
                  {({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  }: FieldProps) => (
                    <Input
                      value={field.value}
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
                <Button
                  size='lg'
                  className='mt-8'
                  variant='info'
                  onClick={() => createServiceWithFixPrice(values)}
                  disabled={!(isValid && dirty)}
                >
                  Опубликовать
                </Button>
              </>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TabServiceWithMenu;
