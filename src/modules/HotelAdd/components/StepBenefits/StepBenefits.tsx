import { FC } from "react";
import styled from "styled-components";
import Link from "next/link";
import { benefitsService } from "@/common/services/benefits-service";
import { useAppSelector } from "@/redux/hooks";
import { selectDynamic } from "@/common/redux/reducers/dynamic";
import { toast } from "react-toastify";
import { InitialAllDataType } from "../../HotelAdd";
import Button from "@/common/ui/Button";
import { useRouter } from "next/router";
import { HotelStateTypes, HotelBenefitsResponse } from "@/common/fetchClient";
import useSWR, { useSWRConfig } from "swr";
import HotelBenefit from "./components/HotelBenefit";
import { useHotel } from "@/common/hook/useHotel";

interface Values {
  address: string;
}

const initialValues: Values = {
  address: "",
};

type Props = {
  title?: string;
  prevStep: () => void;
  nextStep: () => void;
  setAllData: (data: InitialAllDataType) => void;
  hotelId: string | null;
};

const StepBenefits: FC<Props> = ({ title, prevStep, nextStep, setAllData, hotelId }) => {
  const { full, mutateFullHotel } = useHotel(hotelId);

  const { data: activeBenefits } = useSWR<(HotelBenefitsResponse & { icon: string })[]>(
    "/api/hotels/benefits/active",
  );
  const { data: linkedBenefits, mutate: mutateLinkedBenefits } = useSWR<
    (HotelBenefitsResponse & { icon: string })[]
  >(`/api/hotels/${hotelId}/benefits`);

  const linkedBenefitsId = Object.fromEntries(linkedBenefits?.map(({ id }) => [id, true]) ?? []);

  const popularBenefits = activeBenefits?.filter((benefit) => benefit.is_popular) ?? [];
  const otherBenefits = activeBenefits?.filter((benefit) => !benefit.is_popular) ?? [];

  if (!hotelId) {
    return <div className='py-5'>Произошла ошибка</div>;
  }

  // Toggler for Benefits
  const toggleActive = async (id: string, is_active: boolean) => {
    let response;
    if (is_active) {
      response = await benefitsService.unLink({
        hotel_id: hotelId,
        benefit_id: id,
      });
    } else {
      response = await benefitsService.link({ hotel_id: hotelId, benefit_id: id });
    }
    if (response.status >= 200 && response.status < 300) {
      mutateLinkedBenefits();
    }
    mutateFullHotel();
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <FontWrapper className='mb-11'>
        {title && <h2 className='mb-11'>{title}</h2>}

        {popularBenefits.length > 0 && (
          <>
            <h5 className='mb-7 text-secondary'>Популярные удобства</h5>
            <div className='row g-3'>
              {popularBenefits.map(({ name, icon, id, is_active }) => (
                <HotelBenefit
                  className='col-4'
                  id={id}
                  onClick={() => {
                    toggleActive(id, !!linkedBenefitsId[id]);
                  }}
                  key={id}
                  name={name}
                  icon={icon}
                  active={linkedBenefitsId[id]}
                  // isLinked={hotel?.linkedBenefits[id]}
                />
              ))}
            </div>
          </>
        )}

        {otherBenefits.length > 0 && (
          <div className='mt-11'>
            <h5 className='mb-7 text-secondary'>Что-то особенное</h5>
            <div className='row g-3'>
              {otherBenefits.map(({ name, icon, id, is_active }) => (
                <HotelBenefit
                  className='col-4'
                  id={id}
                  onClick={() => {
                    toggleActive(id, !!linkedBenefitsId[id]);
                  }}
                  key={id}
                  name={name}
                  icon={icon}
                  active={linkedBenefitsId[id]}
                />
              ))}
            </div>
          </div>
        )}
      </FontWrapper>

      {/* Control Block */}
      <div className='d-flex w-100 justify-content-between align-items-center mt-auto'>
        <div className='text-dark cursor-pointer' onClick={prevStep}>
          Назад
        </div>
        <Button variant='info' onClick={nextStep}>
          Продолжить
        </Button>
      </div>
    </div>
  );
};

const FontWrapper = styled.div`
  width: 100%;
  max-width: 386px;
`;

export default StepBenefits;
