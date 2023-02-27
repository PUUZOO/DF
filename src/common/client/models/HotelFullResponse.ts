/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HotelAccommodations } from './HotelAccommodations';
import type { HotelAddressResponse } from './HotelAddressResponse';
import type { HotelBenefitsResponse } from './HotelBenefitsResponse';
import type { HotelContactsResponse } from './HotelContactsResponse';
import type { HotelMessengersResponse } from './HotelMessengersResponse';
import type { HotelPhotosResponse } from './HotelPhotosResponse';
import type { HotelStateTypes } from './HotelStateTypes';

export type HotelFullResponse = {
    is_deleted?: boolean;
    name?: string;
    description?: string;
    state?: HotelStateTypes;
    is_active?: boolean;
    account_id: string;
    id: string;
    address?: HotelAddressResponse;
    photos?: Array<HotelPhotosResponse>;
    benefits?: Array<HotelBenefitsResponse>;
    accommodation?: HotelAccommodations;
    contacts?: Array<HotelContactsResponse>;
    messengers?: HotelMessengersResponse;
};
