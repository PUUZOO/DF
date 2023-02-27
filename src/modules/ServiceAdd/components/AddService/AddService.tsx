import styled from "styled-components";
import { useHotel } from "@/common/hook/useHotel";
import InputFile from "@/common/ui/InputFile";
import iconFolder from "@/images/icon-folder.svg";
import Input from "@/common/ui/Input";

const AddService = () => {
  const { roomServices } = useHotel();

  return (
    <div className='h-100 d-flex flex-column align-items-center justify-content-center'>
      <MainFrameStyled>
        <h2 className='mb-11'>Новая услуга</h2>
        <Input as='textarea' placeholder='Описание (необязательно)' />

        <h5 className='text-secondary mb-7 mt-11'>Прайс-лист</h5>
        <InputFile onUpload={() => console.log("upload")}>
          <img src={iconFolder.src} alt='Добавить фото' />
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
      </MainFrameStyled>
    </div>
  );
};

const MainFrameStyled = styled.div`
  width: 100%;
  max-width: 386px;
`;

export default AddService;
