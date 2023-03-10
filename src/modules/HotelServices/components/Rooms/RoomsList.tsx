import { FC } from "react";
import { useRouter } from "next/router";
import Button from "@/common/ui/Button";
import Image from "next/image";
import RoomsCard, { Room } from "./RoomsCard";

const RoomsList: FC = () => {
  const router = useRouter();

  const rooms: Room[] = [
    {
      id: "1",
      name: "Одноместный номер с односпальной кроватью",
      imgUrl: "https://fakeimg.pl/300/",
      roomSize: "45",
      roomAmount: 1,
      hotelId: "1",
      beds: 1,
      guests: 1,
      isActive: true,
      isPetAllowed: true,
      wifi: true,
      tv: false,
      iron: true,
      conditioner: false,
    },
    {
      id: "2",
      name: "Двухместный номер с двухспальной кроватью",
      imgUrl: "https://fakeimg.pl/300/",
      roomSize: "40",
      roomAmount: 1,
      hotelId: "1",
      beds: 1,
      guests: 2,
      isActive: true,
      isPetAllowed: true,
      wifi: false,
      tv: true,
      iron: false,
      conditioner: true,
    },
    {
      id: "3",
      name: "Двухместный номер с двухспальной кроватью",
      imgUrl: "https://fakeimg.pl/300/",
      roomSize: "45",
      roomAmount: 1,
      hotelId: "1",
      beds: 2,
      guests: 3,
      isActive: false,
      isPetAllowed: false,
      wifi: true,
      tv: true,
      iron: true,
      conditioner: true,
    },
  ];
  const activeRooms = rooms.filter((room) => room.isActive);

  const draftRooms = rooms.filter((room) => !room.isActive);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <Button className='btn btn-light w-100' onClick={() => console.log("click")}>
            <Image src={"/svg/plus.svg"} width={24} height={24} alt='' />
            <span className='ms-5 fs-4'>Добавить номер</span>
          </Button>
        </div>
      </div>

      {/* active rooms */}
      <div className='row mt-11 mb-7'>
        <div className='col'>
          <span className='text-secondary'>Активные</span>
        </div>
      </div>

      <div className='row mb-7'>
        <div className='col'>
          {activeRooms.map((room, index) => (
            <RoomsCard room={room} key={index} />
          ))}
        </div>
      </div>

      {/* draft rooms */}
      <div className='row mt-11 mb-7'>
        <div className='col'>
          <span className='text-secondary'>Черновики</span>
        </div>
      </div>

      <div className='row mb-7'>
        <div className='col'>
          {draftRooms.map((room, index) => (
            <RoomsCard room={room} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomsList;
