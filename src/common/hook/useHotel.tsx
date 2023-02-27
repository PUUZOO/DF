import { useAppSelector } from "@/redux/hooks";
import { selectDynamic } from "@/common/redux/reducers/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr";
import {
  HotelPhotosResponse,
  HotelFullResponse,
  RoomServiceFullResponse,
} from "@/common/fetchClient";

export const useHotel = (hotelIdUnique: string | null = null) => {
  const dynamic = useAppSelector(selectDynamic);
  const router = useRouter();
  const hotelId = hotelIdUnique
    ? hotelIdUnique
    : dynamic.hotelId
    ? dynamic.hotelId
    : (router.query.hotelId as string);

  const { data: images, mutate: mutateImages } = useSWR<HotelPhotosResponse[]>(
    `/api/hotels/${hotelId}/photos`,
    {
      isPaused: () => (hotelId ? false : true),
    },
  );

  const { data: full, mutate: mutateFullHotel } = useSWR<HotelFullResponse>(
    `/api/hotels/${hotelId}/full`,
    {
      isPaused: () => (hotelId ? false : true),
    },
  );

  const { data: roomServices, mutate: mutateRoomServices } = useSWR<RoomServiceFullResponse[]>(
    `/api/hotels/${hotelId}/room/services/full`,
    {
      isPaused: () => (hotelId ? false : true),
    },
  );

  const getImages = () => {
    return Array.isArray(images) && images.length > 0
      ? images.map((image) => ({
          ...image,
          preview: process.env.NEXT_PUBLIC_HOST_DRUFFLE_API + image.preview,
          url: process.env.NEXT_PUBLIC_HOST_DRUFFLE_API + image.url,
        }))
      : undefined;
  };

  return {
    id: hotelId,
    images: getImages(),
    mutateImages,
    full,
    mutateFullHotel,
    roomServices,
    mutateRoomServices,
  };
};
