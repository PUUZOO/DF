import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import ServiceList from "./components/ServiceList";
import ServiceSelection from "../ServiceSelection";
import { RoomServicesTypes, RoomServiceMenuItemResponse } from "@/types/SwaggerTypes";

type Props = {
  activeType: RoomServicesTypes | undefined;
  setActiveType: Dispatch<SetStateAction<RoomServicesTypes | undefined>>;
  setAllData: Dispatch<SetStateAction<RoomServiceMenuItemResponse[]>>;
};

const AddService: FC<Props> = ({ activeType, setActiveType, setAllData }) => {
  return (
    <div
      className='d-flex flex-column align-items-center'
      style={{ marginTop: "70px", marginBottom: "70px" }}
    >
      <MainFrameStyled>
        <h2 className='mb-11'>Новая услуга</h2>
        <ServiceList
          active={activeType}
          setActive={(item) => {
            setActiveType(item);
            setAllData([]);
          }}
        />
        {/* Add active condition to render right component */}
        <ServiceSelection type={activeType} setAllData={setAllData} />
      </MainFrameStyled>
    </div>
  );
};

const MainFrameStyled = styled.div`
  width: 100%;
  max-width: 386px;
`;

export default AddService;
