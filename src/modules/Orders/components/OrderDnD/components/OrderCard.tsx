import { RoomServicesTypes } from "@/types/SwaggerTypes";
import { FC, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import openedDoor from "@/images/opened-door.svg";
import closedDoor from "@/images/closed-door.svg";
import attention from "@/images/attention.svg";
import time from "@/images/time.svg";
import durationIcon from "@/images/duration.svg";
import Image from "next/image";
import { useRoomServices } from "@/common/hook/useRoomServices";
import PlusButton from "@/common/ui/PlusButton";
import moment from "moment";

export interface OrderCardProps {
  id: string;
  serviceType: RoomServicesTypes;
  roomNumber: string;
  guestName: string;
  adminName: string | null;
  createdAt: string | number | Date;
  statusType: StatusType;
}

export enum StatusType {
  OPENED = "opened",
  CLOSED = "closed",
}

const OrderCard: FC<OrderCardProps> = ({
  id,
  roomNumber,
  serviceType,
  guestName,
  adminName,
  createdAt,
  statusType,
}) => {
  const statusIcon = useMemo(
    () => ({
      [StatusType.OPENED]: openedDoor.src,
      [StatusType.CLOSED]: closedDoor.src,
    }),
    [statusType],
  );
  const { serviceItemInfo } = useRoomServices();
  const type = serviceItemInfo[serviceType];

  const createdAtDate = moment(+createdAt).format("HH:mm");
  const duration = moment.duration(createdAtDate, "minutes").minutes();

  //TODO: implement urgent icon conditions
  const isUrgent = true;

  return (
    <OrderCardStyled className='d-flex flex-column border border-light rounded mb-4'>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center'>
          <Image src={statusIcon[statusType]} width={24} height={24} alt={statusType} />
          <RoomNumberStyled className='ms-2'>{roomNumber}</RoomNumberStyled>
        </div>
        <TaskIdStyled className='text-secondary'> # {id}</TaskIdStyled>
      </div>
      <div className='text-secondary mt-4 mb-7'>
        <span>
          {type.title} &#183; {guestName}
        </span>
      </div>
      <div className='d-flex align-items-center text-secondary mb-11'>
        {isUrgent && (
          <Image src={attention.src} width={24} height={24} alt='attention' className='me-2' />
        )}
        <TimeSlotStyled className='d-flex rounded-pill me-2 px-3 py-1 align-items-center'>
          <Image src={time.src} width={16} height={16} alt='time' />

          <span className='ms-2'>{createdAtDate}</span>
        </TimeSlotStyled>
        <TimeSlotStyled className='d-flex rounded-pill px-3 py-1 align-items-center'>
          <Image src={durationIcon.src} width={16} height={16} alt='duration' />

          <span className='ms-2'>{duration} мин</span>
        </TimeSlotStyled>
      </div>

      <div className='d-flex'>
        <PlusButton name={adminName}>
          {adminName ? (
            <span>{adminName}</span>
          ) : (
            <span className='text-info'>Добавить исполнителя</span>
          )}
        </PlusButton>
      </div>
      <div></div>
    </OrderCardStyled>
  );
};

const OrderCardStyled = styled.div`
  padding: 20px;
  background: white;
`;

const RoomNumberStyled = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
`;

const TaskIdStyled = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
`;

const TimeSlotStyled = styled.div`
  background-color: #f0f3f5;
  font-size: 14px;
  line-height: 18px;
`;

export default OrderCard;
