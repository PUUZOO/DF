import { RoomServicesTypes } from "@/types/SwaggerTypes";
import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRoomServices } from "@/common/hook/useRoomServices";
import classNames from "classnames";

interface ServiceListProps {
  setActive: Dispatch<SetStateAction<RoomServicesTypes | undefined>>;
  active: RoomServicesTypes | undefined;
}

const ServiceList: FC<ServiceListProps> = ({ setActive, active }) => {
  const { services, serviceItemInfo } = useRoomServices();
  const handleClick = (item: RoomServicesTypes) => {
    setActive(item);
  };

  return (
    <div className='row g-4 my-8'>
      {services?.map((item, key) => {
        const mappedData = serviceItemInfo[item];

        return (
          <div className='col-md-4' key={key} onClick={() => handleClick(item)}>
            <ServiceItemStyled
              active={active === item}
              className={classNames([
                "d-flex",
                "p-2",
                "flex-column",
                "justify-content-center",
                "align-items-center",
                "border",
                "border-light",
                "rounded",
              ])}
            >
              <Image src={mappedData.imgSrc} width={24} height={24} alt={mappedData.title} />
              <span className='mt-2'>{mappedData.title}</span>
            </ServiceItemStyled>
          </div>
        );
      })}
    </div>
  );
};

const ServiceItemStyled = styled.div<{ active: boolean }>`
  height: 104px;
  cursor: pointer;
  font-size: 14px;
  background: ${({ active }) => (active ? "#FBFAFE" : "white")};
  color: ${({ active }) => (active ? "var(--bs-primary)" : "var(--bs-secondary)")};

  &:hover {
    background: #fbfafe;
    border: 1px solid #ded6f9;
  }
`;

export default ServiceList;
