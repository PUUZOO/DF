import { HotelBenefitsLink } from "../fetchClient";
import { nextApiConnection } from "../http";

export const benefitsService = {
  getLinked: async (hotelId: string) => {
    return nextApiConnection.post(`/hotels/${hotelId}/benefits`);
  },
  link: async (body: HotelBenefitsLink) => {
    return nextApiConnection.post(`/hotels/benefits/link`, body);
  },
  unLink: async (body: HotelBenefitsLink) => {
    return nextApiConnection.post(`/hotels/benefits/unlink`, body);
  },
};
