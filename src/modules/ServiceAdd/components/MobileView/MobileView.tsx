import { FC } from "react";
import styled from "styled-components";
import { RoomServicesTypes, RoomServiceMenuItemResponse } from "@/types/SwaggerTypes";
// import bgBW from "@/images/bg-add-service-mobile-black-white.jpg";
import bgColor from "@/images/bg-add-service-mobile-color.jpg";
import { useRoomServices } from "@/common/hook/useRoomServices";
import { all } from "axios";

type Props = { type: RoomServicesTypes | undefined; allData: RoomServiceMenuItemResponse[] };

const MobileView: FC<Props> = ({ type, allData }) => {
  const { services, serviceItemInfo } = useRoomServices();

  return (
    <>
      <TopBlock
        style={{
          background: `url('${bgColor.src}')`,
          filter: `grayscale(${type ? "0%" : "100%"})`,
        }}
      >
        <h2 className='text-white'>{type ? serviceItemInfo[type].title : "Новая услуга"}</h2>
      </TopBlock>
      <BottomBlockStyled className='py-7 px-5'>
        <div className='row'>
          {allData.map((menuItem, key) => (
            <div className='d-flex justify-content-between' key={menuItem.id}>
              <MenuItemStyled className='py-6'>
                <div>{menuItem.name}</div>
                <div className='text-secondary'>{menuItem.price}</div>
              </MenuItemStyled>
              <div></div>
            </div>
          ))}
        </div>
      </BottomBlockStyled>
    </>
  );
};

const TopBlock = styled.div`
  height: 35%;
  background: #f0f3f5;
  background-size: cover !important;
  color: white;
  padding: 35px 11px;
  display: flex;
  align-items: flex-end;
  transition: filter 1s linear !important;
`;

const BottomBlockStyled = styled.div`
  height: calc(65% + 17px);
  max-height: calc(65% + 17px);
  border-radius: 17.92px 17.92px 0px 0px;
  margin-top: -17px;
  background: white;
  position: relative;
  overflow: auto;
`;

const MenuItemStyled = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 11.9467px;
  line-height: 15px;
  border-bottom: 0.746667px solid #e6e8eb;
  width: 100%;
`;

export default MobileView;
