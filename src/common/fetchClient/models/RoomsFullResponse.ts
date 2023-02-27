/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoomBedsResponse } from './RoomBedsResponse';
import type { RoomBenefitsResponse } from './RoomBenefitsResponse';
import type { RoomCategoryTypes } from './RoomCategoryTypes';
import type { RoomPhotosResponse } from './RoomPhotosResponse';

export type RoomsFullResponse = {
    is_deleted?: boolean;
    category_type?: RoomCategoryTypes;
    room_amount?: number;
    room_size?: string;
    is_active?: boolean;
    home_pet_allowed: boolean;
    pet_weight: string;
    pet_deposit: string;
    guest_amount: number;
    hotel_id: string;
    id: string;
    beds?: Array<RoomBedsResponse>;
    benefits?: Array<RoomBenefitsResponse>;
    photos?: Array<RoomPhotosResponse>;
};

