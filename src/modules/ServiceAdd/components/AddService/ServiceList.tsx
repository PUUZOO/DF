import { RoomServicesTypes } from "@/common/fetchClient";
import { Dispatch, FC, SetStateAction } from "react";
import useSWR from "swr";
import styled from "styled-components";
import Image from "next/image";
import { useRoom } from "@/common/hook/useRoom";

interface ServiceListProps {
  setActive: Dispatch<SetStateAction<RoomServicesTypes>>;
}

const ServiceList: FC<ServiceListProps> = ({ setActive }) => {
  const { services, serviceItemInfo } = useRoom();
  const handleClick = (item: RoomServicesTypes) => {
    setActive(item);
  };

  return (
    <div className='row g-4 my-8'>
      {services?.map((item, key) => {
        const mappedData = serviceItemInfo[item];

        return (
          <div className='col-md-4' key={key} onClick={() => handleClick(item)}>
            <ServiceItemStyled className='d-flex p-2 flex-column justify-content-center align-items-center border border-light rounded'>
              <Image src={mappedData.imgSrc} width={24} height={24} alt={mappedData.title} />
              <span className='mt-2'>{mappedData.title}</span>
            </ServiceItemStyled>
          </div>
        );
      })}
    </div>
  );
};

const ServiceItemStyled = styled.div`
  height: 104px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #fbfafe;
    border: 1px solid #ded6f9;
  }
`;

export default ServiceList;
