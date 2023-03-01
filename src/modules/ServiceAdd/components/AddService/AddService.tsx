import { useState } from "react";
import styled from "styled-components";
import { useHotel } from "@/common/hook/useHotel";
import InputFile from "@/common/ui/InputFile";
import iconFolder from "@/images/icon-folder.svg";
import Input from "@/common/ui/Input";
import ServiceList from "./components/ServiceList";
import { RoomServicesTypes } from "@/types/SwaggerTypes";
import ServiceSelection from "../ServiceSelection";

const AddService = () => {
  const [active, setActive] = useState<RoomServicesTypes>(RoomServicesTypes.ORDER_FOOD);

  return (
    <div className='h-100 d-flex flex-column align-items-center justify-content-center'>
      <MainFrameStyled>
        <h2 className='mb-11'>Новая услуга</h2>
        <ServiceList setActive={setActive} />
        {/* Add active condition to render right component */}
        <ServiceSelection type={active} />
      </MainFrameStyled>
    </div>
  );
};

const MainFrameStyled = styled.div`
  width: 100%;
  max-width: 386px;
`;

export default AddService;
