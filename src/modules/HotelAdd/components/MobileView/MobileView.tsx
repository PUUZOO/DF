import { FC, Fragment } from "react";
import { InitialAllDataType } from "../../HotelAdd";
import styled from "styled-components";
import { useHotel } from "@/common/hook/useHotel";
import HotelBenefit from "./components/HotelBenefit";

type Props = {
  allData: InitialAllDataType;
  hotelIdInside: string | null;
};

const MobileView: FC<Props> = ({ allData, hotelIdInside }) => {
  const { images, full } = useHotel(hotelIdInside);

  const popularBenefits = full?.benefits?.filter((benefit) => benefit.is_popular) ?? [];
  const otherBenefits = full?.benefits?.filter((benefit) => !benefit.is_popular) ?? [];

  return (
    <>
      <TopBlock style={{ ...(images ? { background: `url('${images[0].preview}')` } : {}) }} />
      <BottomBlockStyled className='py-7 px-5'>
        <h3>{allData.name}</h3>
        <div className='mb-7 mt-2' style={{ lineHeight: "15px" }}>
          {allData.country && <AddressStyled className='me-1'>{allData.country}</AddressStyled>}
          {allData.city && <AddressStyled className='me-1'>{allData.city}</AddressStyled>}
          {allData.street && <AddressStyled className='me-1'>{allData.street}</AddressStyled>}
          {allData.building && <AddressStyled className='me-1'>{allData.building}</AddressStyled>}
        </div>
        {allData.email && <PhoneStyled className='text-secondary'>{allData.email}</PhoneStyled>}
        <DescriptionStyled>{allData.description}</DescriptionStyled>

        {popularBenefits.length > 0 && (
          <div>
            <h6 className='mt-9 mb-6'>Какие удобства вас ждут</h6>
            <div className='d-flex flex-wrap'>
              {popularBenefits.map((benefit) => (
                <Fragment key={benefit.id}>
                  <HotelBenefit id={benefit.id} name={benefit.name} icon={benefit.icon} />
                </Fragment>
              ))}
            </div>
          </div>
        )}

        {otherBenefits.length > 0 && (
          <div>
            <h6 className='mt-9 mb-6'>Что-то особенное</h6>
            <div className='d-flex flex-wrap'>
              {otherBenefits.map((benefit) => (
                <Fragment key={benefit.id}>
                  <HotelBenefit id={benefit.id} name={benefit.name} icon={benefit.icon} />
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </BottomBlockStyled>
    </>
  );
};

const TopBlock = styled.div`
  height: 35%;
  background: #f0f3f5;
  background-size: cover !important;
`;

const BottomBlockStyled = styled.div``;

const AddressStyled = styled.span`
  font-weight: 400;
  font-size: 11.9467px;
  line-height: 15px;
  color: #667482;
`;

const PhoneStyled = styled.p`
  font-weight: 400;
  font-size: 11.9467px;
  line-height: 15px;
`;

const DescriptionStyled = styled.div`
  font-weight: 400;
  font-size: 11.9467px;
  line-height: 15px;
  color: #201d24;
`;

export default MobileView;
