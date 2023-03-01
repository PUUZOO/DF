import { FC } from "react";
import { useHotel } from "@/common/hook/useHotel";
import Image from "next/image";
import styled from "styled-components";
import { HotelAccommodations, HotelAddressResponse } from "@/common/types/SwaggerTypes";

const HotelPreview: FC = () => {
  const { full: hotel, images } = useHotel();

  if (!hotel) {
    return <>no hotel</>;
  }

  return (
    <HotelPreviewWrapper className='d-flex flex-column justify-content-between '>
      <div className='d-flex flex-column'>
        {images && (
          <>
            {/* Main Image */}
            {Array.isArray(images) && images.length > 0 && (
              <>
                <div className='row m-0'>
                  <div className='col rounded-4 overflow-hidden p-0 position-relative'>
                    <Image src={images[0].preview} width={368} height={248} alt='' />
                  </div>
                </div>

                {images.length > 1 && (
                  <div className='row m-0 mt-3'>
                    <div className='col overflow-hidden p-0 position-relative'>
                      {images.slice(1).map(({ preview, id }) => (
                        <Image
                          className='rounded-4'
                          key={id}
                          src={preview}
                          width={117}
                          height={80}
                          alt=''
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        <div className='container mt-10'>
          <div className='row mb-5'>
            <div className='col'>
              <h3>{hotel.name}</h3>
            </div>
          </div>

          {hotel.address && (
            <div className='row mb-6'>
              <div className='col-2'>
                <Image src={"/svg/location.svg"} width={24} height={24} alt='location' />
              </div>
              <div className='col text-secondary'>
                {hotel.address?.city && <span className='me-1'>{hotel.address.city},</span>}
                {hotel.address?.street && <span className='me-1'>{hotel.address.street},</span>}
                {hotel.address?.building && <span className='me-1'>{hotel.address.building}</span>}
              </div>
            </div>
          )}
          <div className='row'>
            {Array.isArray(hotel.contacts) && hotel.contacts.length > 0 && (
              <>
                <div className='col-2'>
                  <Image src={"/svg/phone.svg"} width={24} height={24} alt='phone' />
                </div>
                <div className='col d-flex align-items-center text-secondary'>
                  {hotel.contacts[0].phone}
                </div>
              </>
            )}
            {hotel?.messengers?.whatsup && (
              <div className='col'>
                <Image src={"/svg/whatsapp.svg"} width={24} height={24} alt='whatsapp' />
              </div>
            )}
            {hotel?.messengers?.telegram && (
              <div className='col'>
                <Image src={"/svg/telegram.svg"} width={24} height={24} alt='telegram' />
              </div>
            )}
          </div>
          {Array.isArray(hotel.contacts) && hotel.contacts.length > 0 && (
            <div className='row mb-6'>
              <div className='col-2'>
                <Image src={"/svg/email.svg"} width={24} height={24} alt='email' />
              </div>
              <div className='col d-flex align-items-center text-secondary'>
                {hotel.contacts[0].email}
              </div>
            </div>
          )}
          {/* TODO: Need change type */}
          {/* @ts-ignore */}
          {(hotel.accommodation?.cash_payment || hotel.accommodation?.card_payment) && (
            <div className='row mb-6'>
              <div className='col-2'>
                <Image src={"/svg/currency_rub.svg"} width={24} height={24} alt='currency' />
              </div>
              <div className='col d-flex align-items-center text-secondary'>
                {/* @ts-ignore */}
                {hotel.accommodation.cash_payment && <span className='me-1'>наличные</span>}
                {/* @ts-ignore */}
                {hotel.accommodation.card_payment && <span>карты</span>}
              </div>
            </div>
          )}
        </div>

        <div className='container mt-6'>
          <div className='row mb-6'>
            <div className='col-2 d-flex align-items-center'>
              <Image src={"/svg/edit_active.svg"} width={24} height={24} alt='edit hotel' />
            </div>
            <div
              className='col d-flex align-items-center text-secondary text-info'
              style={{ cursor: "pointer" }}
            >
              Редактировать
            </div>
          </div>
          <div className='row mb-6'>
            <div className='col-2 d-flex align-items-center'>
              <Image src={"/svg/eye_active.svg"} width={24} height={24} alt='as guest' />
            </div>
            <div
              className='col d-flex align-items-center text-secondary text-info'
              style={{ cursor: "pointer" }}
            >
              Посмотреть как гость
            </div>
          </div>
        </div>
      </div>
      <div className='container rounded-4 w-100 p-7 mt-11' style={{ backgroundColor: "#f3f4f5" }}>
        <div className='row mb-2'>
          <div className='col'>
            <h5>{`Код отеля ${hotel.code}`}</h5>
          </div>
        </div>
        <div className='row'>
          <div className='col fs-6 text-secondary '>
            Он понадобится гостям, чтобы зайти в приложение и заказать услуги
          </div>
        </div>
      </div>
    </HotelPreviewWrapper>
  );
};

const HotelPreviewWrapper = styled.div`
  /* height: 100vh; */
  overflow: hidden;
`;

export default HotelPreview;
