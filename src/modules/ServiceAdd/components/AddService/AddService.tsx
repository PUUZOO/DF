import { useState } from "react";
import styled from "styled-components";
import { useRoomServices } from "@/common/hook/useRoomServices";
import ServiceSelection from "../ServiceSelection";
import { RoomServicesTypes } from "@/common/types/SwaggerTypes";

const AddService = () => {
  const { types } = useRoomServices();
  const [activeType, setActiveType] = useState<RoomServicesTypes>(RoomServicesTypes["ORDER_FOOD"]);

  return (
    <div className='h-100 d-flex flex-column align-items-center justify-content-center'>
      <MainFrameStyled>
        <h2 className='mb-11'>Новая услуга</h2>

        {types && (
          <div className='row g-3'>
            {types.map((type, key) => {
              return (
                <div className='col-md-4' key={key}>
                  <div
                    className='border border-light rounded text-center'
                    onClick={() => {
                      setActiveType(type);
                    }}
                  >
                    {type}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <ServiceSelection type={activeType} />
      </MainFrameStyled>
    </div>
  );
};

const MainFrameStyled = styled.div`
  width: 100%;
  max-width: 386px;
`;

export default AddService;
