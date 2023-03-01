import { Formik, Field, Form, FormikHelpers, FieldProps } from "formik";
import { FC } from "react";
import styled from "styled-components";
import { InitialAllDataType } from "../../HotelAdd";
import Button from "@/common/ui/Button";
import InputFile from "@/common/ui/InputFile";
import cameraIcon from "@/images/camera.svg";
import { hotelsPhotosService } from "@/common/services/hotels-photos-service";
import { HotelPhotosResponse } from "@/common/types/SwaggerTypes";
import Image from "next/image";
import { useHotel } from "@/common/hook/useHotel";

interface Values {
  photo: string;
}

const initialValues: Values = {
  photo: "",
};

type Props = {
  title?: string;
  prevStep: () => void;
  nextStep: () => void;
  setAllData: (data: InitialAllDataType) => void;
  hotelId: string | null;
};

const StepPhoto: FC<Props> = ({ title, prevStep, nextStep, setAllData, hotelId }) => {
  const { images, mutateImages } = useHotel(hotelId);

  if (!hotelId) {
    return <div className='py-5'>Произошла ошибка</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={SchemaValidation}
      onSubmit={async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        nextStep();
      }}
    >
      {({ setFieldTouched }) => (
        <Form className='h-100 d-flex flex-column'>
          <div className='d-flex justify-content-center'>
            <FontWrapper>
              {title && <h2 className='mb-11'>{title}</h2>}
              <Field name='photo'>
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                }: FieldProps) => (
                  <InputFile
                    count={4}
                    onUpload={(photos) => {
                      photos.map(async (photo) => {
                        const formData = new FormData();
                        formData.append("file", photo);
                        const response = await hotelsPhotosService.create(hotelId, formData);
                        if (response.status === 201 || response.status === 200) {
                          mutateImages();
                        }
                      });
                    }}
                    openDialogOnClick
                    disabled={images && images.length >= 4}
                  >
                    <img src={cameraIcon.src} alt='Добавить фото' />
                    <div
                      className='text-center mt-6'
                      style={{
                        maxWidth: "228px",
                        fontSize: "14px",
                        lineHeight: "18px",
                        color: "#667482",
                      }}
                    >
                      {images && images.length >= 4
                        ? "Максимально можно добавить 4 фотографии. "
                        : "Перетащите 4 фото отеля в поле или загрузите с компьютера"}
                    </div>
                  </InputFile>
                )}
              </Field>
              {images && (
                <div className='row mt-4 g-4 mb-11'>
                  {images.map((image, key) => {
                    return (
                      <div className='col-6' key={key}>
                        <ImageFrameStyle
                          onClick={async () => {
                            const response = await hotelsPhotosService.delete(hotelId, image.id);
                            if (response.status === 200) mutateImages();
                          }}
                        >
                          <Image fill src={image.preview} alt='' />
                        </ImageFrameStyle>
                      </div>
                    );
                  })}
                </div>
              )}
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

const ImageFrameStyle = styled.div`
  overflow: hidden;
  border-radius: 12px;
  position: relative;
  display: block;
  /* width: 208px; */
  height: 165px;
  img {
    object-position: center;
    object-fit: cover;
  }

  &:hover::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    cursor: pointer;
    background: red;
    opacity: 0.4;
  }
`;

export default StepPhoto;
