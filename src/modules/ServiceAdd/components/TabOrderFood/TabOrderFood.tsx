import InputFile from "@/common/ui/InputFile";
import iconFolder from "@/images/icon-folder.svg";
import Input from "@/common/ui/Input";

const TabOrderFood = () => {
  return (
    <div>
      <Input className='mt-7' as='textarea' placeholder='Описание (необязательно)' />

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
    </div>
  );
};

export default TabOrderFood;
