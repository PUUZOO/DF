/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoomCategoryTypes } from './RoomCategoryTypes';

export type RoomsUpdateRequest = {
    is_deleted?: boolean;
    category_type?: RoomCategoryTypes;
    room_amount?: number;
    room_size?: string;
    is_active?: boolean;
    home_pet_allowed: boolean;
    pet_weight: string;
    pet_deposit: string;
    guest_amount: number;
};

