import { FC } from "react";
import styled from "styled-components";
import Image from "next/image";
import Wifi from "@/images/wifi.svg";
import TV from "@/images/tv.svg";
import Iron from "@/images/iron.svg";
import Paw from "@/images/paw.svg";
import Conditioner from "@/images/conditioner.svg";

export interface Room {
  id: string;
  name: string;
  imgUrl: string;
  roomSize: string;
  roomAmount: number;
  hotelId: string;
  beds: number;
  guests: number;
  isActive: boolean;
  isPetAllowed: boolean;
  wifi: boolean;
  tv: boolean;
  iron: boolean;
  conditioner: boolean;
}

interface Props {
  room: Room;
}

const RoomsCard: FC<Props> = ({ room }) => {
  const {
    id,
    name,
    imgUrl,
    roomSize,
    roomAmount,
    hotelId,
    beds,
    guests,
    isActive,
    isPetAllowed,
    wifi,
    conditioner,
    tv,
    iron,
  } = room;

  return (
    <CardStyled className='card mb-2'>
      {/* <Image src={imgUrl} alt={name} width={300} height={300} /> */}
      <div className='card-img-top bg-info'></div>
      <div className='card-body'>
        <h5 className='card-title mb-4'>{room.name}</h5>
        <div className='card-text text-secondary mb-11'>
          <span>
            {roomAmount} комната &#183; {beds} кровать &#183; {guests} гостей &#183; {roomSize} м²
          </span>
        </div>

        <div className='card-text d-flex'>
          {wifi && <Image src={Wifi.src} width={24} height={24} alt='wifi' />}
          {tv && <Image src={TV.src} width={24} height={24} alt='tv' />}
          {iron && <Image src={Iron.src} width={24} height={24} alt='iron' />}
          {conditioner && <Image src={Conditioner.src} width={24} height={24} alt='conditioner' />}
          {isPetAllowed && <Image src={Paw.src} width={24} height={24} alt='paw' />}
        </div>
      </div>
    </CardStyled>
  );
};

const CardStyled = styled.div`
  width: 100%;
  height: 160px;
  flex-direction: row;

  .bg-info {
    width: 40%;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 5px;
  }

  .card-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    gap: 10px;
  }
`;

export default RoomsCard;
