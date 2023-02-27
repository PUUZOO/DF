import { FC, useRef } from "react";
import { useState } from "react";
import StepMainInfo from "../StepMainInfo";
import StepAddress from "../StepAddress";
import StepPhoto from "../StepPhoto";
import StepBenefits from "../StepBenefits";
import StepAccommodations from "../StepAccommodations";
import StepMessengers from "../StepMessengers";
import ModalEnd from "../ModalEnd";
import { InitialAllDataType } from "../../HotelAdd";

type Props = {
  setAllData: (data: InitialAllDataType) => void;
  hotelIdInside: string | null;
  setHotelIdInside: (id: string) => void;
};

const StepsForm: FC<Props> = ({ setAllData, hotelIdInside, setHotelIdInside }) => {
  const [step, setStep] = useState(1);
  const [modalFinal, setModalFinal] = useState(false);

  return (
    <div className='d-flex flex-column h-100'>
      {/* Form Block */}
      <div className='h-100' style={{ marginTop: "74px" }}>
        {step === 1 && (
          <StepMainInfo
            nextStep={(hotelId) => {
              setStep(2);
              setHotelIdInside(hotelId);
            }}
            setAllData={setAllData}
            title='Основная информация об отеле'
          />
        )}
        {step === 2 && (
          <StepAddress
            prevStep={() => setStep(1)}
            nextStep={() => setStep(3)}
            setAllData={setAllData}
            title='Адрес'
            hotelId={hotelIdInside}
          />
        )}
        {step === 3 && (
          <StepPhoto
            prevStep={() => setStep(2)}
            nextStep={() => setStep(4)}
            setAllData={setAllData}
            title='Фото'
            hotelId={hotelIdInside}
          />
        )}
        {step === 4 && (
          <StepBenefits
            prevStep={() => setStep(3)}
            nextStep={() => setStep(5)}
            setAllData={setAllData}
            title='Преимущества'
            hotelId={hotelIdInside}
          />
        )}
        {step === 5 && (
          <StepAccommodations
            prevStep={() => setStep(4)}
            nextStep={() => setStep(6)}
            setAllData={setAllData}
            title='Условия проживания'
            hotelId={hotelIdInside}
          />
        )}
        {step === 6 && (
          <StepMessengers
            prevStep={() => setStep(5)}
            nextStep={() => setModalFinal(!modalFinal)}
            setAllData={setAllData}
            title='Для гостей'
            hotelId={hotelIdInside}
          />
        )}
        <ModalEnd
          show={modalFinal}
          onHide={() => setModalFinal(!modalFinal)}
          hotelId={hotelIdInside}
        />
      </div>
    </div>
  );
};

export default StepsForm;
